import { GrammarPattern } from "../models/grammar.model";

// Data source: Nikola-Ver/English-grammar-tree (MIT License)
// https://github.com/Nikola-Ver/English-grammar-tree

export const GRAMMAR_EN: GrammarPattern[] = [
  {
    "id": "en_a1_01",
    "language": "en",
    "pattern": "am / is / are",
    "title": "am / is / are - forms of the verb to be",
    "shortExplanation": "I am, he is, they are",
    "longExplanation": "to be is the most important verb in the English language, an analogue of the \nThree forms: am - only with I; is - with he, she, it; are - with you, we, they.",
    "formation": "I am, he is, they are",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I am hungry.",
        "translation": "I'm hungry."
      },
      {
        "sentence": "She is a doctor.",
        "translation": "She's a doctor."
      },
      {
        "sentence": "They are ready.",
        "translation": "They're ready."
      }
    ]
  },
  {
    "id": "en_a1_02",
    "language": "en",
    "pattern": "Negation",
    "title": "Negation: am not / isn't / aren't",
    "shortExplanation": "I'm not tired. He isn't here. They aren't ready.",
    "longExplanation": "Negation is constructed by adding not: am not, is not, are not.\nShort forms: isn't (= is not), aren't (= are not). Only am not is not reduced to amn't - an exception!",
    "formation": "I'm not tired. He isn't here. They aren't ready.",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I'm not a student.",
        "translation": "I'm not a student."
      },
      {
        "sentence": "He isn't tired.",
        "translation": "He's not tired."
      },
      {
        "sentence": "We aren't ready.",
        "translation": "We're not ready."
      }
    ]
  },
  {
    "id": "en_a1_03",
    "language": "en",
    "pattern": "to be",
    "title": "Questions with to be: Am I? / Is she? / Are they?",
    "shortExplanation": "Is she a teacher? Are you cold? Am I late?",
    "longExplanation": "In questions, the verb to be is placed before the subject: She is → Is she?\nSpecial questions: question word + to be + subject: Where is he? What is this?\nShort answers: Yes, I am. / No, she isn't",
    "formation": "Is she a teacher? Are you cold? Am I late?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Are you a student?",
        "translation": "Are you a student?"
      },
      {
        "sentence": "Is it expensive?",
        "translation": "Is it expensive?"
      },
      {
        "sentence": "Where are they?",
        "translation": "Where are they?"
      }
    ]
  },
  {
    "id": "en_a1_04",
    "language": "en",
    "pattern": "Short answers",
    "title": "Short answers: Yes, I am. / No, she isn't.",
    "shortExplanation": "Only full form - not allowed: \"Yes, I'm\"",
    "longExplanation": "In short answers the pronoun + to be. You cannot shorten the form of the verb in an affirmative answer.\nAre you tired? — Yes, I am.✓    Yes, I'm. ✗",
    "formation": "Only full form - not allowed: \"Yes, I'm\"",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Is she ready? — Yes, she is.",
        "translation": "Is she ready? - Yes."
      },
      {
        "sentence": "Are they your friends? — No, they aren't.",
        "translation": "Are they your friends? - No."
      }
    ]
  },
  {
    "id": "en_a1_05",
    "language": "en",
    "pattern": "Article a / an",
    "title": "Article a / an - indefinite",
    "shortExplanation": "a dog, an apple, an hour, a university",
    "longExplanation": "a and an are the indefinite article, placed before the first mentioned object in the singular.\nThe choice depends on the sound, not the letter:\n• a - before the consonant sound: a book, a car, a university [ju...]\n• an - before a vowel sound: an apple, an hour [aʊ...], an honest man",
    "formation": "a dog, an apple, an hour, a university",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I saw a cat in the garden.",
        "translation": "I saw a cat in the garden."
      },
      {
        "sentence": "She is an engineer.",
        "translation": "She's an engineer."
      },
      {
        "sentence": "It took an hour.",
        "translation": "It took an hour."
      }
    ]
  },
  {
    "id": "en_a1_06",
    "language": "en",
    "pattern": "Article the",
    "title": "Article the - definite",
    "shortExplanation": "the sun, the door, the book on the table",
    "longExplanation": "the is used when the speaker and listener know what they are talking about.\nWhen we put the:\n1. The subject has already been mentioned:I saw a cat. The cat was black.\n2. One of a kind: the sun, the moon, the earth\n3. It is clear from the context: Close the window, please.\n4. Superlative: the best, the biggest",
    "formation": "the sun, the door, the book on the table",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "The film we saw was amazing.",
        "translation": "The movie we watched was amazing."
      },
      {
        "sentence": "Could you pass the salt?",
        "translation": "Could you pass the salt?"
      }
    ]
  },
  {
    "id": "en_a1_07",
    "language": "en",
    "pattern": "Zero article",
    "title": "Zero article - when the article is not needed",
    "shortExplanation": "I like music. She plays tennis. He is from Russia.",
    "longExplanation": "The article is not placed before:\n• Proper names: John, London, Russia\n• Languages and nationalities: English, \n• Sports and games: football, chess\n• Food/drinks in a general sense: I love coffee\n• Abstract concepts in general: Life is short. Love is blind.\n• Plural in the general sense: Dogs are friendly.",
    "formation": "I like music. She plays tennis. He is from Russia.",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "She speaks Spanish.",
        "translation": "She speaks Spanish."
      },
      {
        "sentence": "He plays basketball every day.",
        "translation": "He plays basketball every day."
      }
    ]
  },
  {
    "id": "en_a1_08",
    "language": "en",
    "pattern": "Present Simple",
    "title": "Present Simple - affirmative sentences",
    "shortExplanation": "I work. He works. She goes. It runs.",
    "longExplanation": "Present Simple is used for: habits and regular actions, facts and general truths, schedules.\nFormula: I/you/we/they + infinitive; he/she/it + infinitive+s/es\nRules for writing endings -s/-es:\n• Most verbs: + s → works, plays\n• Ending in -o, -ch, -sh, -s, -ss, -x: + es → goes, watches, washes\n• End with a consonant + -y: -y → ies → studies, tries",
    "formation": "I work. He works. She goes. It runs.",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I drink coffee every morning.",
        "translation": "I drink coffee every morning."
      },
      {
        "sentence": "She works in a hospital.",
        "translation": "She works in a hospital."
      },
      {
        "sentence": "The Earth goes round the Sun.",
        "translation": "The Earth revolves around the Sun."
      }
    ]
  },
  {
    "id": "en_a1_09",
    "language": "en",
    "pattern": "Present Simple - negation",
    "title": "Present Simple - negation: don't / doesn't",
    "shortExplanation": "I don't like it. He doesn't like it. (not: he don't)",
    "longExplanation": "Negation is constructed using the auxiliary verb do/does + not:\n• I/you/we/they + don't + infinitive\n• he/she/it + doesn't + infinitive",
    "formation": "I don't like it. He doesn't like it. (not: he don't)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I don't eat meat.",
        "translation": "I don't eat meat."
      },
      {
        "sentence": "He doesn't speak French.",
        "translation": "He doesn't speak French."
      },
      {
        "sentence": "They don't work here.",
        "translation": "They don't work here."
      }
    ]
  },
  {
    "id": "en_a1_10",
    "language": "en",
    "pattern": "Present Simple - questions",
    "title": "Present Simple - questions: Do you? /Does she?",
    "shortExplanation": "Do you like pizza? Does he work here? Where do they live?",
    "longExplanation": "Questions: Do/Does + subject + infinitive?\n• I/you/we/they: Do you...?\n• he/she/it: Does she...?\nSpecial questions: question word + do/does + subject + infinitive:\nWhere does she live? What do they do?",
    "formation": "Do you like pizza? Does he work here? Where do they live?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Do you speak Russian?",
        "translation": "Do you speak Russian?"
      },
      {
        "sentence": "Does she live nearby?",
        "translation": "Does she live nearby?"
      },
      {
        "sentence": "Where do you work?",
        "translation": "Where do you work?"
      }
    ]
  },
  {
    "id": "en_a1_11",
    "language": "en",
    "pattern": "Stative verbs",
    "title": "Stative verbs - verbs not used in Continuous",
    "shortExplanation": "I know, not: I am knowing. I love, not: I am loving.",
    "longExplanation": "Some verbs describe a state rather than an action - they are not used in Continuous tenses.\nMain groups:\n• Opinions: know, believe, think, understand, remember, forget\n• Feelings: love, hate, like, want, need, prefer\n• Perception: see, hear, smell, taste, look\n• Being: be, exist, belong, contain, seem, appear",
    "formation": "I know, not: I am knowing. I love, not: I am loving.",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I understand you. (не: I am understanding)",
        "translation": "I understand you."
      },
      {
        "sentence": "She loves chocolate. (не: is loving)",
        "translation": "She loves chocolate."
      }
    ]
  },
  {
    "id": "en_a1_12",
    "language": "en",
    "pattern": "Personal pronouns",
    "title": "Personal pronouns: I, you, he, she, it, we, they",
    "shortExplanation": "You always need an explicit subject - you can't skip I",
    "longExplanation": "Unlike \nIn \nObject forms (after a verb or preposition): me, you, him, her, it, us, them.",
    "formation": "You always need an explicit subject - you can't skip I",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "She is a teacher.",
        "translation": "She's a teacher."
      },
      {
        "sentence": "Tell him the truth.",
        "translation": "Tell him the truth."
      },
      {
        "sentence": "Can you help me?",
        "translation": "Can you help me?"
      }
    ]
  },
  {
    "id": "en_a1_13",
    "language": "en",
    "pattern": "Possessive adjectives",
    "title": "Possessive adjectives: my, your, his, her, its, our, their",
    "shortExplanation": "my book, her car, their house - do not change by number",
    "longExplanation": "Possessive adjectives show ownership and go before the noun.\nImportant: its (without apostrophe) = ownership; it's (with an apostrophe) = it is.\nDo not change in gender and number: my friend / my friends - the same.",
    "formation": "my book, her car, their house - do not change by number",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "This is my phone.",
        "translation": "This is my phone."
      },
      {
        "sentence": "Their dog is cute.",
        "translation": "Their dog is cute."
      },
      {
        "sentence": "The cat hurt its paw.",
        "translation": "The cat injured its paw."
      }
    ]
  },
  {
    "id": "en_a1_14",
    "language": "en",
    "pattern": "Plural of nouns",
    "title": "Plural of nouns",
    "shortExplanation": "cats, boxes, knives, children, men, sheep",
    "longExplanation": "Basic rule: add -s.\nSpecial cases:\n• -s, -ss, -sh, -ch, -x, -o: + es → boxes, watches, tomatoes\n• vowel + -y: + s → boys, days\n• consonant + -y: -y → ies → cities, babies\n• -f/-fe: → ves → knives, leaves, wives\nIrregular: child→children, man→men, woman→women, tooth→teeth, foot→feet, mouse→mice, person→people, fish→fish, sheep→sheep",
    "formation": "cats, boxes, knives, children, men, sheep",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "one bus → two buses",
        "translation": "one bus → two buses"
      },
      {
        "sentence": "one child → many children",
        "translation": "one child → many children"
      }
    ]
  },
  {
    "id": "en_a1_15",
    "language": "en",
    "pattern": "This / that / these / those",
    "title": "This / that / these / those",
    "shortExplanation": "this/these - nearby; that/those - far away",
    "longExplanation": "this (this) - singular + next\nthese (these) - plural + nearby\nthat (that) - singular + far or already known\nthose (those) - plural + far\nAlso used about time: this week (this week), that year (that year).",
    "formation": "this/these - nearby; that/those - far away",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "This is my bag.",
        "translation": "This is my bag."
      },
      {
        "sentence": "Those shoes are expensive.",
        "translation": "Those shoes are expensive."
      },
      {
        "sentence": "What is that?",
        "translation": "What is it?"
      }
    ]
  },
  {
    "id": "en_a1_16",
    "language": "en",
    "pattern": "There is / there are",
    "title": "There is / there are - existence",
    "shortExplanation": "There is a park. There are five rooms.",
    "longExplanation": "The construction there is/are means “exists/exist”, “is”.\n• There is + singular noun. number\n• There are + plural noun. number\nNegation: There isn't / There aren't\nQuestion: Is there...? / Are there...?",
    "formation": "There is a park. There are five rooms.",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "There is a cinema near here.",
        "translation": "There is a cinema nearby."
      },
      {
        "sentence": "Are there any shops nearby? — Yes, there are.",
        "translation": "Are there any shops nearby? - Yes."
      }
    ]
  },
  {
    "id": "en_a1_17",
    "language": "en",
    "pattern": "Prepositions of place",
    "title": "Prepositions of place: in, on, at, under, next to, behind, between",
    "shortExplanation": "in the box, on the table, at the station",
    "longExplanation": "Three main prepositions:\n• in = inside something: in the box, in the city, in bed\n• on = on the surface: on the table, on the wall, on the left\n• at = at a specific point: at the station, at home, at school\nOthers: under (under), next to/beside (near), behind (behind), in front of (in front), between (between), opposite (opposite)",
    "formation": "in the box, on the table, at the station",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "The keys are on the table.",
        "translation": "The keys are on the table."
      },
      {
        "sentence": "She is in the kitchen.",
        "translation": "She's in the kitchen."
      },
      {
        "sentence": "Meet me at the entrance.",
        "translation": "Meet me at the entrance."
      }
    ]
  },
  {
    "id": "en_a1_18",
    "language": "en",
    "pattern": "Imperative",
    "title": "Imperative",
    "shortExplanation": "Open your books. Don't run. Please sit down.",
    "longExplanation": "Imperative = base form of a verb without a subject.\nNegation: Don't + infinitive\nPlease makes the request politer (at the beginning or end).\nTo include the speaker: Let's + infinitive → Let's go! Let's eat!",
    "formation": "Open your books. Don't run. Please sit down.",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Turn left at the crossroads.",
        "translation": "Turn left at the intersection."
      },
      {
        "sentence": "Don't touch that!",
        "translation": "Don't touch this!"
      },
      {
        "sentence": "Let's have a break.",
        "translation": "Let's take a break."
      }
    ]
  },
  {
    "id": "en_a1_19",
    "language": "en",
    "pattern": "can / can't",
    "title": "can / can't - skill and resolution",
    "shortExplanation": "I can swim. She can't drive. Can I help you?",
    "longExplanation": "can is a modal verb, expresses:\n1. Skill/Ability: I can play the guitar\n2. Opportunity: It can be dangerous\n3. Resolution (spoken): Can I use your phone?",
    "formation": "I can swim. She can't drive. Can I help you?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I can speak three languages.",
        "translation": "I speak three languages."
      },
      {
        "sentence": "She can't come today.",
        "translation": "She can't come today."
      },
      {
        "sentence": "Can you help me, please?",
        "translation": "Could you help me?"
      }
    ]
  },
  {
    "id": "en_a1_20",
    "language": "en",
    "pattern": "Question words",
    "title": "Question words: what, where, who, when, how, why, which, whose, how much/many",
    "shortExplanation": "What is this? Where do you live? How old are you?",
    "longExplanation": "Question words appear at the beginning of the question, followed by an auxiliary verb before the subject.\n• what = what/which\n• where = where/where\n• who = who (question without do: Who lives here?)\n• when = when\n• why = why\n• how = how; how much = how many (uncountable); how many = how many (count); how old = how old; how long = how long",
    "formation": "What is this? Where do you live? How old are you?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Where does she work?",
        "translation": "Where does she work?"
      },
      {
        "sentence": "What time is it?",
        "translation": "What time is it?"
      },
      {
        "sentence": "How many brothers do you have?",
        "translation": "How many brothers do you have?"
      }
    ]
  },
  {
    "id": "en_a1_21",
    "language": "en",
    "pattern": "Quantitative numerals",
    "title": "Quantitative numerals: 1–1000",
    "shortExplanation": "one, two, three... twenty-one, a hundred, a thousand",
    "longExplanation": "Numerals 1–12: special words (one, two, three... twelve).\n13–19: + -teen (thirteen, fourteen... nineteen; exceptions: thirteen, fifteen, eighteen).\nTens: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety.\nCompounds: 21 = twenty-one (via hyphen).\n100 = a/one hundred; 1000 = a/one thousand.\nAfter hundred/thousand - and (BrE): two hundred and fifty.",
    "formation": "one, two, three... twenty-one, a hundred, a thousand",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "She is twenty-three years old.",
        "translation": "She is twenty-three years old."
      },
      {
        "sentence": "The ticket costs four hundred pounds.",
        "translation": "The ticket costs four hundred pounds."
      }
    ]
  },
  {
    "id": "en_a1_22",
    "language": "en",
    "pattern": "Ordinal numbers",
    "title": "Ordinal numbers: first, second, third...",
    "shortExplanation": "the first, the second, the third, the fourth... the twenty-first",
    "longExplanation": "Ordinal numbers are formed by adding -th: fourth, fifth, sixth...\nExceptions: first (1st), second (2nd), third (3rd), fifth (5th), eighth (8th), ninth (9th), twelfth (12th).\nAlways used with the article the: the first day, the third floor.\nFractions: ½ = a half, ⅓ = a third, ¼ = a quarter.",
    "formation": "the first, the second, the third, the fourth... the twenty-first",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "My office is on the third floor.",
        "translation": "My office is on the third floor."
      },
      {
        "sentence": "Today is the first of March.",
        "translation": "Today is the first of March."
      }
    ]
  },
  {
    "id": "en_a1_23",
    "language": "en",
    "pattern": "Possessive case",
    "title": "Possessive case: 's and s'",
    "shortExplanation": "John's car, my sister's friend, the children's toys, the teachers' room",
    "longExplanation": "In English, belonging is expressed by an apostrophe + s:\n• Singular: Tom's book, the dog's tail\n• Plural with -s: apostrophe only: the teachers' room, my parents' house\n• Irregular plural: 's: the children's playground, men's clothes\n• Names ending with -s: James's / James' - both options are correct",
    "formation": "John's car, my sister's friend, the children's toys, the teachers' room",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "This is Anna's laptop.",
        "translation": "This is Anna's laptop."
      },
      {
        "sentence": "The children's toys are in the box.",
        "translation": "Children's toys in a box."
      }
    ]
  },
  {
    "id": "en_a1_24",
    "language": "en",
    "pattern": "Prepositions of movement",
    "title": "Prepositions of movement: to, into, out of, up, down, along, across, through",
    "shortExplanation": "go to school, walk into the room, run across the street",
    "longExplanation": "• to = direction to a point: go to work, walk to the park\n• into = movement inward: come into the room, jump into the pool\n• out of = movement outward: get out of the car, take out of the bag\n• up/down = up/down: climb up the hill, walk down the stairs\n• along = along: walk along the river\n• across = across/through: swim across the lake, walk across the road\n• through = through: drive through the tunnel",
    "formation": "go to school, walk into the room, run across the street",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "She walked into the room.",
        "translation": "She entered the room."
      },
      {
        "sentence": "He ran across the street.",
        "translation": "He ran across the street."
      },
      {
        "sentence": "We drove through the forest.",
        "translation": "We drove through the forest."
      }
    ]
  },
  {
    "id": "en_a2_01",
    "language": "en",
    "pattern": "Past Simple - regular verbs",
    "title": "Past Simple - regular verbs: +ed",
    "shortExplanation": "work→worked, play→played, stop→stopped, study→studied",
    "longExplanation": "Past Simple - a completed action in the past with or without a specific tense.\nRules for writing the ending -ed:\n• Most verbs: + ed → worked, played\n• End in -e: + d → loved, used\n• Consonant + -y: -y → ied → studied, tried\n• One vowel + one consonant (short stressed syllable): double the consonant → stopped, planned",
    "formation": "work→worked, play→played, stop→stopped, study→studied",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "She worked all day yesterday.",
        "translation": "She worked all day yesterday."
      },
      {
        "sentence": "They played tennis last Sunday.",
        "translation": "They played tennis last Sunday."
      }
    ]
  },
  {
    "id": "en_a2_02",
    "language": "en",
    "pattern": "Past Simple",
    "title": "Past Simple - irregular verbs (table)",
    "shortExplanation": "go→went, see→saw, have→had, come→came, buy→bought",
    "longExplanation": "About 200 irregular verbs need to be learned by heart. The most frequent 50 cover ~90% of uses.\nGroups by similarity of changes:\n• AAA (do not change): cut, put, hit, set, let\n• ABA (return to the beginning): run→ran→run, come→came→come\n• ABC (all different): go→went→gone, be→was/were→been",
    "formation": "go→went, see→saw, have→had, come→came, buy→bought",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I went to Paris last summer.",
        "translation": "I went to Paris last summer."
      },
      {
        "sentence": "She saw a great film.",
        "translation": "She watched a great movie."
      },
      {
        "sentence": "We had a meeting at 9.",
        "translation": "We had a meeting at 9."
      }
    ]
  },
  {
    "id": "en_a2_03",
    "language": "en",
    "pattern": "Past Simple - negation",
    "title": "Past Simple - negation: didn't + infinitive",
    "shortExplanation": "She didn't go (not: didn't go). I didn't see him.",
    "longExplanation": "Negation: didn't (= did not) + infinitive for all persons.",
    "formation": "She didn't go (not: didn't go). I didn't see him.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I didn't see him yesterday.",
        "translation": "I didn't see him yesterday."
      },
      {
        "sentence": "She didn't come to work.",
        "translation": "She didn't show up for work."
      }
    ]
  },
  {
    "id": "en_a2_04",
    "language": "en",
    "pattern": "Past Simple - questions",
    "title": "Past Simple - questions: Did you? Where did she go?",
    "shortExplanation": "Did they arrive? What did he say?",
    "longExplanation": "Question: Did + subject + infinitive?\nSpecial questions: Where/When/What + did + subject + infinitive?",
    "formation": "Did they arrive? What did he say?",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Did you enjoy the film?",
        "translation": "Did you like the movie?"
      },
      {
        "sentence": "Where did they go?",
        "translation": "Where did they go?"
      },
      {
        "sentence": "Who told you that?",
        "translation": "Who told you this?"
      }
    ]
  },
  {
    "id": "en_a2_05",
    "language": "en",
    "pattern": "was / were",
    "title": "was / were - verb to be in the past",
    "shortExplanation": "I/he/she/it was. You/we/they were.",
    "longExplanation": "Past tense of the verb to be:\n• was - with I, he, she, it\n• were - with you, we, they\nNegation: wasn't / weren't\nQuestion: Was she...? Were they...?",
    "formation": "I/he/she/it was. You/we/they were.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I was very tired last night.",
        "translation": "I was very tired last night."
      },
      {
        "sentence": "They were at home all day.",
        "translation": "They were at home all day."
      },
      {
        "sentence": "Was it expensive?",
        "translation": "Was it expensive?"
      }
    ]
  },
  {
    "id": "en_a2_06",
    "language": "en",
    "pattern": "will",
    "title": "will - predictions and spontaneous decisions",
    "shortExplanation": "I'll call you back. It will rain tomorrow. I'll have the pasta.",
    "longExplanation": "will is used for:\n1. Spontaneous decisions (made at the time of speech): I'll help you with that.\n2. Predictions without a specific plan: I think it will rain.\n3. Promises: I won't tell anyone.\n4. Requests: Will you open the window?\nAbbreviation: 'll. Negation: won't (= will not).",
    "formation": "I'll call you back. It will rain tomorrow. I'll have the pasta.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "The phone is ringing. — I'll get it!",
        "translation": "The phone is ringing. - I will answer!"
      },
      {
        "sentence": "It will be cold tomorrow.",
        "translation": "It will be cold tomorrow."
      }
    ]
  },
  {
    "id": "en_a2_07",
    "language": "en",
    "pattern": "going to",
    "title": "going to - intentions and obvious predictions",
    "shortExplanation": "I'm going to visit Paris. Look out - you're going to fall!",
    "longExplanation": "going to is used for:\n1. Pre-made decisions and intentions: I'm going to start a diet next week.\n2. Predictions with visible signs: Look at those clouds - it's going to rain!\nForm: am/is/are + going to + infinitive",
    "formation": "I'm going to visit Paris. Look out - you're going to fall!",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I'm going to study medicine.",
        "translation": "I'm going to study medicine."
      },
      {
        "sentence": "She's going to have a baby.",
        "translation": "She's expecting a baby."
      }
    ]
  },
  {
    "id": "en_a2_08",
    "language": "en",
    "pattern": "Present Continuous",
    "title": "Present Continuous: am/is/are + V-ing",
    "shortExplanation": "She is reading now. They are playing outside.",
    "longExplanation": "Present Continuous is an action taking place right now or temporarily during this period.\nForm: am/is/are + verb + -ing\nRules for writing -ing:\n• Most: just + ing → working, playing\n• Ends with -e: remove -e + ing → making, coming\n• Short stressed syllable: double the last consonant → running, sitting",
    "formation": "She is reading now. They are playing outside.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I am studying English right now.",
        "translation": "I'm studying English now."
      },
      {
        "sentence": "She's working from home this month.",
        "translation": "She is working from home this month."
      }
    ]
  },
  {
    "id": "en_a2_09",
    "language": "en",
    "pattern": "Present Continuous for planned future",
    "title": "Present Continuous for planned future",
    "shortExplanation": "I'm meeting Tom tomorrow. We're flying to Rome on Friday.",
    "longExplanation": "Present Continuous is used for specific agreements in the future - when the time and place have already been determined.\nDifference:\n• I'm meeting Alice tomorrow - the meeting has been agreed (a specific plan)\n• I'll meet Alice tomorrow - intention or proposal",
    "formation": "I'm meeting Tom tomorrow. We're flying to Rome on Friday.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I'm having dinner with Alex tonight.",
        "translation": "I'm having dinner with Alex tonight."
      },
      {
        "sentence": "They're getting married in June.",
        "translation": "They are getting married in June."
      }
    ]
  },
  {
    "id": "en_a2_10",
    "language": "en",
    "pattern": "Present Simple vs Present Continuous",
    "title": "Present Simple vs Present Continuous - difference",
    "shortExplanation": "I drink coffee (habit) vs I am drinking coffee (right now)",
    "longExplanation": "Present Simple: habits, facts, schedules, general truths.\nPresent Continuous: something that is happening right now or temporarily.\nCompare:\n• She speaks French. - knows the language (always)\n• She is speaking French. - speaks right now",
    "formation": "I drink coffee (habit) vs I am drinking coffee (right now)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Water boils at 100°C. (факт)",
        "translation": "Water boils at 100°C."
      },
      {
        "sentence": "I'm reading a great book this week. (временно)",
        "translation": "I'm reading a great book this week."
      }
    ]
  },
  {
    "id": "en_a2_11",
    "language": "en",
    "pattern": "should / shouldn't",
    "title": "should / shouldn't - advice and recommendation",
    "shortExplanation": "You should see a doctor. You shouldn't eat so much.",
    "longExplanation": "should expresses mild advice or personal opinion. Weaker than must.\nAfter should - infinitive without to.\nAlso used for criticism or regret: You should have called (should have called).",
    "formation": "You should see a doctor. You shouldn't eat so much.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "You should exercise more.",
        "translation": "You should exercise more."
      },
      {
        "sentence": "She shouldn't work so hard.",
        "translation": "She shouldn't work so hard."
      }
    ]
  },
  {
    "id": "en_a2_12",
    "language": "en",
    "pattern": "must / mustn't",
    "title": "must / mustn't - obligation and strict prohibition",
    "shortExplanation": "You must wear a seatbelt. You mustn't smoke here.",
    "longExplanation": "must - a strong obligation (often internal) or a categorical requirement.\nmustn't - a strict prohibition (absolutely impossible!).\n• mustn't = prohibited\n• don't have to = not required, but possible",
    "formation": "You must wear a seatbelt. You mustn't smoke here.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "You must show your passport.",
        "translation": "You must present your passport."
      },
      {
        "sentence": "You mustn't smoke here.",
        "translation": "You can't smoke here."
      }
    ]
  },
  {
    "id": "en_a2_13",
    "language": "en",
    "pattern": "have to",
    "title": "have to - external necessity",
    "shortExplanation": "I have to work late. She doesn't have to come.",
    "longExplanation": "have to - a necessity due to external rules, circumstances or other people's requirements.\nDifference from must:\n• must - internal necessity: I must call her (I myself consider it necessary)\n• have to - external: I have to wear a uniform (rule)\ndon't have to=optional (not necessary, but allowed).",
    "formation": "I have to work late. She doesn't have to come.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I have to finish this report by Friday.",
        "translation": "I have to submit my report by Friday."
      },
      {
        "sentence": "You don't have to come if you don't want to.",
        "translation": "You don't have to come."
      }
    ]
  },
  {
    "id": "en_a2_14",
    "language": "en",
    "pattern": "could",
    "title": "could - past skill and polite requests",
    "shortExplanation": "She could swim when she was 5. Could you help me?",
    "longExplanation": "could is the past tense of can. Two main meanings:\n1. Skill in the past: I could read at 4 years old.\n2. Polite requests (more polite than can): Could you pass the salt, please?\nAlso for present possibility: It could be true.",
    "formation": "She could swim when she was 5. Could you help me?",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "She could play the violin as a child.",
        "translation": "She knew how to play the violin as a child."
      },
      {
        "sentence": "Could you speak more slowly, please?",
        "translation": "Could you speak more slowly?"
      }
    ]
  },
  {
    "id": "en_a2_15",
    "language": "en",
    "pattern": "Comparative degree of adjectives",
    "title": "Comparative degree of adjectives",
    "shortExplanation": "bigger, more interesting, better, worse",
    "longExplanation": "Monosyllabic and disyllabic in -y: + er (fast→faster, happy→happier).\nPolysyllabic: more + adjective.\nWriting rules: -e → + r (nice→nicer); short stressed syllable: double (big→bigger); -y → ier (heavy→heavier).\nIrregular: good→better, bad→worse, far→further/farther, much/many→more\nAfter the comparative - than: She is taller than her sister.",
    "formation": "bigger, more interesting, better, worse",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "This film is more interesting than that one.",
        "translation": "This movie is more interesting than that."
      },
      {
        "sentence": "Today is worse than yesterday.",
        "translation": "Today is worse than yesterday."
      }
    ]
  },
  {
    "id": "en_a2_16",
    "language": "en",
    "pattern": "Superlative adjectives",
    "title": "Superlative adjectives",
    "shortExplanation": "the biggest, the most beautiful, the best",
    "longExplanation": "Monosyllabic: the + -est. Polysyllabic: the most.\nThe writing rules are the same as for the comparative degree.\nIrregular: good→the best, bad→the worst, far→the furthest, much/many→the most",
    "formation": "the biggest, the most beautiful, the best",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "This is the most expensive restaurant in the city.",
        "translation": "This is the most expensive restaurant in the city."
      },
      {
        "sentence": "He is the best player on the team.",
        "translation": "He is the best player on the team."
      }
    ]
  },
  {
    "id": "en_a2_17",
    "language": "en",
    "pattern": "some / any",
    "title": "some / any - indefinite amount",
    "shortExplanation": "I have some money. Do you have any? I don't have any.",
    "longExplanation": "some - in affirmative sentences and in offers/requests.\nany - in questions and negations.\nException: some in questions when we expect an affirmative answer or offer something: Would you like some tea? Can I have some water?",
    "formation": "I have some money. Do you have any? I don't have any.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I bought some bread and some milk.",
        "translation": "I bought bread and milk."
      },
      {
        "sentence": "Is there any milk in the fridge?",
        "translation": "Is there milk in the refrigerator?"
      },
      {
        "sentence": "I don't have any cash on me.",
        "translation": "I don't have cash with me."
      }
    ]
  },
  {
    "id": "en_a2_18",
    "language": "en",
    "pattern": "much / many / a lot of / a few / a little",
    "title": "much / many / a lot of / a few / a little",
    "shortExplanation": "much water (uncountable), many people (countable), a lot of - everywhere",
    "longExplanation": "much - with uncountables (much water, much time, much money).\nmany - with countables (many people, many books, many times).\na lot of / lots of - with both, conversational style.\na few - a little (countable, neutral/positive).\nfew - few, almost none (countable, negative).\na little - a little (uncountable, neutral).\nlittle - little, almost none (uncountable, negative).",
    "formation": "much water (uncountable), many people (countable), a lot of - everywhere",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I don't have much time.",
        "translation": "I don't have much time."
      },
      {
        "sentence": "She has a few friends in London.",
        "translation": "She has several friends in London."
      },
      {
        "sentence": "There is a little sugar left.",
        "translation": "There is some sugar left."
      }
    ]
  },
  {
    "id": "en_a2_19",
    "language": "en",
    "pattern": "Countable and uncountable nouns",
    "title": "Countable and uncountable nouns",
    "shortExplanation": "water, information, advice - not allowed: a water, two advices",
    "longExplanation": "Countable: you can count, there are plural. number: a book, two books.\nUncountable: cannot be counted directly - no plural. numbers, no indefinite article.\nTypical uncountables: water, milk, bread, rice, money, information, advice, news, weather, luggage, furniture, hair, music, work\nTo indicate portions: a glass of water, a piece of advice, a loaf of bread, a bag of rice",
    "formation": "water, information, advice - not allowed: a water, two advices",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Can I have some information, please?",
        "translation": "May I know something?"
      },
      {
        "sentence": "She gave me very useful advice.",
        "translation": "She gave me very useful advice."
      }
    ]
  },
  {
    "id": "en_a2_20",
    "language": "en",
    "pattern": "Prepositions in / on / at for time",
    "title": "Prepositions in / on / at for time",
    "shortExplanation": "in March, in 2024, in winter; on Monday, on June 5; at 3pm, at night",
    "longExplanation": "at → exact time: at 6 o'clock, at noon, at midnight, at night, at the weekend (BrE)\non → days and dates: on Monday, on 5 March, on my birthday, on New Year's Day\nin → periods: in July, in 2023, in the morning/afternoon/evening, in summer, in the 21st century\nWithout preposition: this/last/next + time: this morning, last week, next year",
    "formation": "in March, in 2024, in winter; on Monday, on June 5; at 3pm, at night",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "The meeting is at half past three.",
        "translation": "Meeting at half past four."
      },
      {
        "sentence": "She was born on the 12th of April.",
        "translation": "She was born on April 12."
      },
      {
        "sentence": "I started this job in October.",
        "translation": "I started this work in October."
      }
    ]
  },
  {
    "id": "en_a2_21",
    "language": "en",
    "pattern": "for / since / ago",
    "title": "for / since / ago - duration and beginning",
    "shortExplanation": "for three years, since 2020, three years ago",
    "longExplanation": "for - duration (how long): for two hours, for a week, for years. Used with different tenses.\nsince - initial moment (since): since Monday, since 2019, since I was a child. Used with the Present Perfect.\nago - time ago from now: three days ago, a month ago. Only with Past Simple.",
    "formation": "for three years, since 2020, three years ago",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I've been here for six months.",
        "translation": "I've been here for six months now."
      },
      {
        "sentence": "She's worked here since 2020.",
        "translation": "She has been working here since 2020."
      },
      {
        "sentence": "I saw him two days ago.",
        "translation": "I saw him two days ago."
      }
    ]
  },
  {
    "id": "en_a2_22",
    "language": "en",
    "pattern": "Tail questions",
    "title": "Tail questions: ...isn't it? / ...do you? / ...haven't they?",
    "shortExplanation": "It's cold, isn't it? You like jazz, don't you?",
    "longExplanation": "Tag questions are used to confirm or clarify.\nRule: affirmative sentence → negative tag, and vice versa.\nAuxiliary verb in the tail = tense of the main sentence.\nIntonation: ↘ (falling) = confirmation; ↗ (rising) = real question.",
    "formation": "It's cold, isn't it? You like jazz, don't you?",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "It's a nice day, isn't it?",
        "translation": "Nice day, right?"
      },
      {
        "sentence": "You don't like horror films, do you?",
        "translation": "You don't like horror films, do you?"
      },
      {
        "sentence": "She can swim, can't she?",
        "translation": "She can swim, can't she?"
      }
    ]
  },
  {
    "id": "en_a2_23",
    "language": "en",
    "pattern": "have got",
    "title": "have got - possession (British version)",
    "shortExplanation": "I've got a car. Have you got a pen? She hasn't got time.",
    "longExplanation": "have got is a colloquial British form of possession. Value = have.\n• Affirmation: I have got / I've got a laptop.\n• Denial: I haven't got / I don't have\n• Question: Have you got...? / Do you have...?",
    "formation": "I've got a car. Have you got a pen? She hasn't got time.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I've got two brothers.",
        "translation": "I have two brothers."
      },
      {
        "sentence": "Have you got the time?",
        "translation": "Don't you know what time it is?"
      },
      {
        "sentence": "She hasn't got any cash.",
        "translation": "She doesn't have cash."
      }
    ]
  },
  {
    "id": "en_a2_24",
    "language": "en",
    "pattern": "Adverbs of manner",
    "title": "Adverbs of manner: quickly, carefully, well, hard, fast",
    "shortExplanation": "She sings beautifully. He works hard. She drives fast.",
    "longExplanation": "Most adverbs are formed from adjectives + -ly: quick → quickly, careful → carefully, slow → slowly.\nSpecial cases:\n• good → well (not goodly)\n• fast → fast (not fastly)\n• hard → hard (not hardly - this is another word: “barely”)\n• late → late (not lately - this is “lately”)\nPlace: usually after the verb/object: She speaks English well.",
    "formation": "She sings beautifully. He works hard. She drives fast.",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "He explained it clearly.",
        "translation": "He explained it clearly."
      },
      {
        "sentence": "She ran fast.",
        "translation": "She ran fast."
      },
      {
        "sentence": "They worked hard all day.",
        "translation": "They worked hard all day."
      }
    ]
  },
  {
    "id": "en_a2_25",
    "language": "en",
    "pattern": "Adverbs of frequency and their place in a sentence",
    "title": "Adverbs of frequency and their place in a sentence",
    "shortExplanation": "always, usually, often, sometimes, rarely, never - before the main verb",
    "longExplanation": "Adverbs of frequency: always, usually, often, sometimes, occasionally, rarely, rarely, never.\nPlace in a sentence:\n• Before the main verb: She always drinks tea.\n• After the verb to be: He is always late.\n• After the auxiliary verb: She has never been to Italy.\nAlso: every day/week, once a week, twice a month - at the end of the sentence.",
    "formation": "always, usually, often, sometimes, rarely, never - before the main verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I usually wake up at 7.",
        "translation": "I usually wake up at 7."
      },
      {
        "sentence": "She is never late for work.",
        "translation": "She is never late for work."
      },
      {
        "sentence": "They meet once a week.",
        "translation": "They meet once a week."
      }
    ]
  },
  {
    "id": "en_a2_26",
    "language": "en",
    "pattern": "Order of adjectives before nouns",
    "title": "Order of adjectives before nouns",
    "shortExplanation": "a lovely small old red Italian leather bag",
    "longExplanation": "When several adjectives appear before a noun, a strict order is observed: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose\n(Opinion → Size → Age → Shape → Color → Origin → Material → Purpose)\nExample: a small beautiful old square brown French wooden writing desk",
    "formation": "a lovely small old red Italian leather bag",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "a lovely little old cottage",
        "translation": "lovely little old cottage"
      },
      {
        "sentence": "a big red Italian sports car",
        "translation": "big red italian sports car"
      }
    ]
  },
  {
    "id": "en_b1_01",
    "language": "en",
    "pattern": "Present Perfect",
    "title": "Present Perfect - form and meaning",
    "shortExplanation": "I have seen it. She has gone. They have arrived.",
    "longExplanation": "Present Perfect = have/has + V3 (third form of the verb).\nThree main meanings:\n1. Life Experience (no time specified): I have visited Tokyo.\n2. Result in the present: I have lost my keys. (there are no keys now)\n3. Unfinished action, ongoing now: She has lived here for 5 years.\nV3 regular verbs = Past Simple (worked, played). Incorrect ones need to be known separately.",
    "formation": "I have seen it. She has gone. They have arrived.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Have you ever eaten sushi?",
        "translation": "Have you ever eaten sushi?"
      },
      {
        "sentence": "I've just finished my homework.",
        "translation": "I just finished my homework."
      },
      {
        "sentence": "She hasn't called yet.",
        "translation": "She hasn't called yet."
      }
    ]
  },
  {
    "id": "en_b1_02",
    "language": "en",
    "pattern": "ever / never / already / yet / just",
    "title": "ever / never / already / yet / just - Present Perfect markers",
    "shortExplanation": "Have you ever...? I've never... I've already... Not yet. I've just...",
    "longExplanation": "ever - someday (in questions about experience). Location: in front of V3.\nnever - never (negative value). Location: in front of V3.\nalready - already (earlier than expected). Place: before V3 or at the end.\nyet - already/yet. In questions (Have you finished yet?) and negations (I haven't finished yet). Place: end of sentence.\njust - just now. Location: in front of V3.",
    "formation": "Have you ever...? I've never... I've already... Not yet. I've just...",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Have you ever been to Scotland?",
        "translation": "Have you been to Scotland?"
      },
      {
        "sentence": "I've never eaten snails.",
        "translation": "I've never eaten snails."
      },
      {
        "sentence": "I've already seen that film.",
        "translation": "I've already seen this film."
      }
    ]
  },
  {
    "id": "en_b1_03",
    "language": "en",
    "pattern": "Present Perfect vs Past Simple",
    "title": "Present Perfect vs Past Simple - the key difference",
    "shortExplanation": "I've been to Paris (experience) vs I went to Paris in 2019 (specific time)",
    "longExplanation": "This is one of the most important differences in English grammar.\nPresent Perfect - connection with the present, time is NOT indicated:\nI've lost my wallet. (no wallet now - this is important)\nPast Simple - completed past, time is indicated or implied:\nI lost my wallet yesterday. (yesterday is a specific time)",
    "formation": "I've been to Paris (experience) vs I went to Paris in 2019 (specific time)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I've met the new director. (он сейчас здесь, это актуально)",
        "translation": "I met the new director."
      },
      {
        "sentence": "I met him last Tuesday. (конкретное время)",
        "translation": "I met him last Tuesday."
      }
    ]
  },
  {
    "id": "en_b1_04",
    "language": "en",
    "pattern": "Present Perfect with for and since",
    "title": "Present Perfect with for and since",
    "shortExplanation": "I've lived here for 5 years / since 2019.",
    "longExplanation": "for - duration: for two days, for a year, for a long time, for ages\nsince - starting point: since Monday, since I was a child, since 2015\nThe question “How long?” — How long + Present Perfect: How long have you known her?",
    "formation": "I've lived here for 5 years / since 2019.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "She's worked here for ten years.",
        "translation": "She's been working here for ten years."
      },
      {
        "sentence": "I've known him since university.",
        "translation": "I've known him since university."
      }
    ]
  },
  {
    "id": "en_b1_05",
    "language": "en",
    "pattern": "Present Perfect Continuous",
    "title": "Present Perfect Continuous: have been + V-ing",
    "shortExplanation": "I have been waiting for an hour. She has been studying all day.",
    "longExplanation": "Present Perfect Continuous = have/has been + V-ing\nEmphasis on duration or incompleteness of action. Answers the question “How long?”\nOften explains the visible result in the present: You look tired - have you been running?\nDifference with Present Perfect Simple:\n• I've read 50 pages. - result, completeness\n• I've been reading all evening. - emphasis on the process",
    "formation": "I have been waiting for an hour. She has been studying all day.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I've been learning English for two years.",
        "translation": "I've been learning English for two years now."
      },
      {
        "sentence": "Why are your hands dirty? — I've been fixing the car.",
        "translation": "Why are your hands dirty? — I was repairing the car."
      }
    ]
  },
  {
    "id": "en_b1_06",
    "language": "en",
    "pattern": "Past Continuous",
    "title": "Past Continuous: was/were + V-ing",
    "shortExplanation": "I was reading at 8pm. They were talking all evening.",
    "longExplanation": "Past Continuous = was/were + V-ing\nValues:\n1. Action in process at a specific moment in the past: At 9pm I was having dinner.\n2. Background activity interrupted by another: I was walking when it started to rain.\n3. Parallel actions: While she was cooking, he was watching TV.",
    "formation": "I was reading at 8pm. They were talking all evening.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "It was raining when I left home.",
        "translation": "It was raining when I left the house."
      },
      {
        "sentence": "What were you doing at 7 yesterday?",
        "translation": "What were you doing yesterday at 7?"
      }
    ]
  },
  {
    "id": "en_b1_07",
    "language": "en",
    "pattern": "Past Simple vs Past Continuous",
    "title": "Past Simple vs Past Continuous - background and event",
    "shortExplanation": "While I was cooking, he called. I was walking when it started to rain.",
    "longExplanation": "Typical design: long background action (Past Continuous) + short event (Past Simple).\nUnions:\n• when - used with the Past Simple for the event: She was sleeping when the alarm went off.\n• while/as - used with Past Continuous for background: While I was watching TV, the power went out.",
    "formation": "While I was cooking, he called. I was walking when it started to rain.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "She was having a bath when the phone rang.",
        "translation": "She was taking a bath when the phone rang."
      },
      {
        "sentence": "While he was giving his speech, someone fell asleep.",
        "translation": "While he was making his speech, someone fell asleep."
      }
    ]
  },
  {
    "id": "en_b1_08",
    "language": "en",
    "pattern": "Type 0",
    "title": "Type 0: If + Present, Present - facts and laws",
    "shortExplanation": "If you heat water to 100°C, it boils.",
    "longExplanation": "Type zero - for scientific facts, laws of nature, general truths. Both actions always happen together.\nForm: If + Present Simple, Present Simple\nInstead of if you can use when: When you mix red and blue, you get purple.",
    "formation": "If you heat water to 100°C, it boils.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "If you heat ice, it melts.",
        "translation": "If you heat ice, it melts."
      },
      {
        "sentence": "If it rains, the streets get wet.",
        "translation": "If it rains, the streets get wet."
      }
    ]
  },
  {
    "id": "en_b1_09",
    "language": "en",
    "pattern": "1st type",
    "title": "1st type: If + Present Simple, will - real future",
    "shortExplanation": "If it rains tomorrow, I'll stay home.",
    "longExplanation": "A real, probable situation in the future.\nForm: If + Present Simple, will + infinitive\nInstead of will in the main part you can: can, may, might, should.\nParts can be changed: I'll stay home if it rains. (without comma)",
    "formation": "If it rains tomorrow, I'll stay home.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "If she studies hard, she'll pass the exam.",
        "translation": "If she studies well, she will pass the exam."
      },
      {
        "sentence": "If you need help, I can come.",
        "translation": "If you need help, I can come."
      }
    ]
  },
  {
    "id": "en_b1_10",
    "language": "en",
    "pattern": "Type 2",
    "title": "Type 2: If + Past Simple, would - unreal present",
    "shortExplanation": "If I had a car, I would drive to work. If I were you...",
    "longExplanation": "An unreal or unlikely situation in the present or future.\nForm: If + Past Simple, would + infinitive",
    "formation": "If I had a car, I would drive to work. If I were you...",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "If I won the lottery, I would travel the world.",
        "translation": "If I won the lottery, I would travel the world."
      },
      {
        "sentence": "If I were taller, I'd play basketball.",
        "translation": "If I were taller, I would play basketball."
      }
    ]
  },
  {
    "id": "en_b1_11",
    "language": "en",
    "pattern": "Type 1 vs Type 2",
    "title": "Type 1 vs Type 2: real vs unlikely",
    "shortExplanation": "If I win (1st, really) vs If I won (2nd, unlikely)",
    "longExplanation": "The choice of type reflectsyour confidencein the reality of the situation.\n• If I see her (1st type) - I expect to see her\n• If I saw her (2nd type) - unlikely or I’m just fantasizing\nThis is not a difference in grammar, but a difference in the attitude of the speaker.",
    "formation": "If I win (1st, really) vs If I won (2nd, unlikely)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "If it rains tomorrow, I'll take an umbrella. (реально возможно)",
        "translation": "If it rains tomorrow, I will take an umbrella."
      },
      {
        "sentence": "If it rained every day, I'd move to Spain. (маловероятная фантазия)",
        "translation": "If it rained every day, I would move to Spain."
      }
    ]
  },
  {
    "id": "en_b1_12",
    "language": "en",
    "pattern": "Passive Voice - Present Simple",
    "title": "Passive Voice - Present Simple: is/are + V3",
    "shortExplanation": "Coffee is grown in Brazil. The car is made in Germany.",
    "longExplanation": "Passive voice is used when:\n• The action itself is important, not the person who performs it\n• Performer unknown or obvious\nForm Present Simple Passive: am/is/are + V3\nThe performer (if needed) is added with by: The window was broken by the ball.",
    "formation": "Coffee is grown in Brazil. The car is made in Germany.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "English is spoken in many countries.",
        "translation": "English is spoken in many countries."
      },
      {
        "sentence": "The letter is written in French.",
        "translation": "The letter is written in French."
      }
    ]
  },
  {
    "id": "en_b1_13",
    "language": "en",
    "pattern": "Passive Voice - Past Simple",
    "title": "Passive Voice - Past Simple: was/were + V3",
    "shortExplanation": "The bridge was built in 1890. They were arrested.",
    "longExplanation": "Past Simple Passive: was/were + V3\n• was - units. number\n• were - plural. number\nActive → Passive: Someone stole my car. → My car was stolen.",
    "formation": "The bridge was built in 1890. They were arrested.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "The Eiffel Tower was built in 1889.",
        "translation": "The Eiffel Tower was built in 1889."
      },
      {
        "sentence": "Three people were injured in the accident.",
        "translation": "Three people were injured in the accident."
      }
    ]
  },
  {
    "id": "en_b1_14",
    "language": "en",
    "pattern": "Passive Voice - Present Perfect",
    "title": "Passive Voice - Present Perfect: has/have been + V3",
    "shortExplanation": "The car has been repaired. All invitations have been sent.",
    "longExplanation": "Present Perfect Passive: has/have been + V3\nUsed when the result in the present is important, and not when exactly it happened.",
    "formation": "The car has been repaired. All invitations have been sent.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "The project has been completed.",
        "translation": "The project is completed."
      },
      {
        "sentence": "All the guests have been informed.",
        "translation": "All guests have been notified."
      }
    ]
  },
  {
    "id": "en_b1_15",
    "language": "en",
    "pattern": "Reported Speech",
    "title": "Reported Speech - time shift",
    "shortExplanation": "\"I'm tired.\" → He said he was tired.",
    "longExplanation": "When translated into indirect speech, the tenses are “shifted” back:\n• Present Simple → Past Simple: \"I work\" → he said he worked\n• Past Simple → Past Perfect: \"I went\" → she said she had gone\n• Present Perfect → Past Perfect: \"I've seen\" → he said he had seen\n• will → would; can → could; is → was; am going → was going",
    "formation": "\"I'm tired.\" → He said he was tired.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "She said: 'I am leaving.' → She said she was leaving.",
        "translation": "She said she was leaving."
      },
      {
        "sentence": "He told me: 'I can't come.' → He told me he couldn't come.",
        "translation": "He said he couldn't come."
      }
    ]
  },
  {
    "id": "en_b1_16",
    "language": "en",
    "pattern": "Reported questions",
    "title": "Reported questions - indirect questions",
    "shortExplanation": "\"Where do you live?\" → She asked where I lived.",
    "longExplanation": "In indirect questions:\n1. No inversion (word order as in the statement)\n2. No auxiliary do/did\n3. General questions (Yes/No) → if/whether + subject + verb",
    "formation": "\"Where do you live?\" → She asked where I lived.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "\"Where do you work?\" → She asked where I worked.",
        "translation": "She asked where I worked."
      },
      {
        "sentence": "\"Are you married?\" → He wanted to know if I was married.",
        "translation": "He wanted to know if I was married."
      }
    ]
  },
  {
    "id": "en_b1_17",
    "language": "en",
    "pattern": "say vs tell in indirect speech",
    "title": "say vs tell in indirect speech",
    "shortExplanation": "He said that... / He told me that... - after tell you need a face!",
    "longExplanation": "say - without the required addition: She said she was tired.\ntell - ALWAYS with an addition (to whom it is told): She told me she was tired.\n❌ He told that he was late. ✓ He said that he was late.",
    "formation": "He said that... / He told me that... - after tell you need a face!",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "She said she needed help.",
        "translation": "She said she needed help."
      },
      {
        "sentence": "He told us the meeting was cancelled.",
        "translation": "He informed us that the meeting was cancelled."
      }
    ]
  },
  {
    "id": "en_b1_18",
    "language": "en",
    "pattern": "Verbs + gerund (V-ing)",
    "title": "Verbs + gerund (V-ing)",
    "shortExplanation": "I enjoy reading. She finished writing. He avoided making mistakes.",
    "longExplanation": "These verbs require a gerund (V-ing) after them:\nenjoy, finish, avoid, mind, suggest, keep, consider, deny, imagine, miss, practice, risk, admit, delay, dislike, fancy, give up, involve, put off, recommend, resist\nMemorization trick: if you can replace it with “process”, it’s most likely a gerund.",
    "formation": "I enjoy reading. She finished writing. He avoided making mistakes.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I enjoy swimming in the sea.",
        "translation": "I like to swim in the sea."
      },
      {
        "sentence": "She's considering moving abroad.",
        "translation": "She is thinking about moving abroad."
      },
      {
        "sentence": "He avoided making eye contact.",
        "translation": "He avoided eye contact."
      }
    ]
  },
  {
    "id": "en_b1_19",
    "language": "en",
    "pattern": "Verbs + infinitive (to + V)",
    "title": "Verbs + infinitive (to + V)",
    "shortExplanation": "I want to go. She decided to stay. He managed to finish.",
    "longExplanation": "These verbs require an infinitive with to:\nwant, decide, hope, plan, manage, agree, promise, refuse, fail, expect, offer, learn, need, afford, arrange, attempt, choose, claim, demand, deserve, help, pretend, tend, threaten",
    "formation": "I want to go. She decided to stay. He managed to finish.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "She decided to quit her job.",
        "translation": "She decided to quit."
      },
      {
        "sentence": "I hope to see you soon.",
        "translation": "Hope to see you soon."
      },
      {
        "sentence": "He failed to answer.",
        "translation": "He couldn't answer."
      }
    ]
  },
  {
    "id": "en_b1_20",
    "language": "en",
    "pattern": "Verbs with both (like, love, hate, start, begin)",
    "title": "Verbs with both (like, love, hate, start, begin)",
    "shortExplanation": "I like reading = I like to read - slight difference",
    "longExplanation": "After like/love/hate/prefer both options are possible:\n• V-ing - we talk about the action as a whole: I love cooking. (I generally like to cook)\n• to-inf - we are talking about a specific case: I'd like to cook tonight.\nAfter start/begin/continue/cease there is practically no difference.",
    "formation": "I like reading = I like to read - slight difference",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I love travelling / to travel.",
        "translation": "I like to travel."
      },
      {
        "sentence": "She started working / to work here in May.",
        "translation": "She started working here in May."
      }
    ]
  },
  {
    "id": "en_b1_21",
    "language": "en",
    "pattern": "used to",
    "title": "used to - past habits and states",
    "shortExplanation": "I used to play football. She used to have long hair.",
    "longExplanation": "used to - regular actions or conditions in the past that have already stopped.\nForm: used to + infinitive\nDenial: didn't use to\nQuestion: Did you use to...?\nDifference from be used to: I am used to waking up early = I'm used to it (now).",
    "formation": "I used to play football. She used to have long hair.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I used to smoke, but I stopped.",
        "translation": "I used to smoke, but I quit."
      },
      {
        "sentence": "Did you use to play an instrument?",
        "translation": "Have you played an instrument before?"
      }
    ]
  },
  {
    "id": "en_b1_22",
    "language": "en",
    "pattern": "Relative clauses",
    "title": "Relative clauses: who, which, that, where, whose",
    "shortExplanation": "The man who called. The book that I read. The place where we met.",
    "longExplanation": "who - for people: The woman who called is my sister.\nwhich - for objects and animals: The book which I borrowed was great.\nthat - for people and objects (in defining clauses): The car that he bought is new.\nwhere - for places: The café where we met is closed.\nwhose - accessory: The girl whose bag was stolen...\nIn colloquial speech, a pronoun is often omitted if it is an object: The film (that) I saw...",
    "formation": "The man who called. The book that I read. The place where we met.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "The man who lives next door is very friendly.",
        "translation": "The man who lives next door is very friendly."
      },
      {
        "sentence": "The hotel where we stayed had a pool.",
        "translation": "The hotel we stayed in had a swimming pool."
      }
    ]
  },
  {
    "id": "en_b1_23",
    "language": "en",
    "pattern": "Conjunctions of contrast",
    "title": "Conjunctions of contrast: although, however, despite, in spite of, whereas",
    "shortExplanation": "Although it was raining, we went out. Despite the rain, we went.",
    "longExplanation": "although / even though / though + subordinate clause.\ndespite / in spite of + noun / gerund (NOT subordinate clause!).\nhowever + new sentence (after period or semicolon).\nwhereas is a contrast between two facts.",
    "formation": "Although it was raining, we went out. Despite the rain, we went.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Although she was tired, she kept working.",
        "translation": "Although she was tired, she continued to work."
      },
      {
        "sentence": "Despite the rain, he cycled to work.",
        "translation": "Despite the rain, he rode his bike to work."
      },
      {
        "sentence": "It was expensive. However, it was worth it.",
        "translation": "It was expensive. Still, it was worth it."
      }
    ]
  },
  {
    "id": "en_b1_24",
    "language": "en",
    "pattern": "Future Continuous",
    "title": "Future Continuous: will be + V-ing",
    "shortExplanation": "I'll be working at 9 tomorrow. She'll be flying over the Atlantic.",
    "longExplanation": "Future Continuous = will be + V-ing\nValues:\n1. An action that will be in progress at a specific moment in the future: At this time tomorrow, I'll be lying on the beach.\n2. Planned, expected action in the future (natural course of events): I'll be seeing her tomorrow anyway.\n3. Polite questions about plans (no pressure): Will you be coming to the party?",
    "formation": "I'll be working at 9 tomorrow. She'll be flying over the Atlantic.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Don't call at 8 — I'll be having dinner.",
        "translation": "Don't call at 8 - I'll have dinner."
      },
      {
        "sentence": "This time next week I'll be sitting on a beach.",
        "translation": "This time next week I'll be sitting on the beach."
      }
    ]
  },
  {
    "id": "en_b1_25",
    "language": "en",
    "pattern": "Future Perfect",
    "title": "Future Perfect: will have + V3",
    "shortExplanation": "By Friday I will have finished the report. By 2030 they will have built the bridge.",
    "longExplanation": "Future Perfect = will have + V3\nAn action that will be completed before a certain point in the future.\nOften used with by (the time), before: By the time you arrive, I will have cooked dinner.",
    "formation": "By Friday I will have finished the report. By 2030 they will have built the bridge.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I'll have finished this book by Sunday.",
        "translation": "I will finish reading this book by Sunday."
      },
      {
        "sentence": "By 2050, scientists will have found a cure.",
        "translation": "By 2050, scientists will find a cure."
      }
    ]
  },
  {
    "id": "en_b1_26",
    "language": "en",
    "pattern": "Subordinate goals",
    "title": "Subordinate goals: to, in order to, so that, so as to",
    "shortExplanation": "I study hard to pass. She left early so that she could catch the train.",
    "longExplanation": "to / in order to / so as to + infinitive - goal. In order to and so as to are a little more formal.\nso that + subject + verb - purpose with another subject or with a modal.",
    "formation": "I study hard to pass. She left early so that she could catch the train.",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "She studies hard in order to get a scholarship.",
        "translation": "She studies hard to get a scholarship."
      },
      {
        "sentence": "He left early so that he could catch the last train.",
        "translation": "He left early to catch the last train."
      }
    ]
  },
  {
    "id": "en_b1_27",
    "language": "en",
    "pattern": "Phrasal verbs",
    "title": "Phrasal verbs - basic",
    "shortExplanation": "give up, look up, turn off, find out, get on, put off, carry on",
    "longExplanation": "Phrasal verbs = verb + particle (preposition or adverb). The meaning is often idiomatic.\nThe most frequent:\n• give up = give up, give up\n• find out = find out, find out\n• turn on/off = turn on/off\n• look up = look up (in the dictionary/Internet)\n• look after = take care\n• put off = put off\n• carry on = continue\n• get on/along = to get along (with someone)\n• bring up = to educate; bring up the topic\n• come across = stumble upon",
    "formation": "give up, look up, turn off, find out, get on, put off, carry on",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I've given up smoking.",
        "translation": "I quit smoking."
      },
      {
        "sentence": "Can you look after my cat while I'm away?",
        "translation": "Can you look after my cat while I'm away?"
      },
      {
        "sentence": "We need to find out what happened.",
        "translation": "We need to find out what happened."
      }
    ]
  },
  {
    "id": "en_b2_01",
    "language": "en",
    "pattern": "Past Perfect Simple",
    "title": "Past Perfect Simple: had + V3",
    "shortExplanation": "By the time she arrived, he had already left.",
    "longExplanation": "Past Perfect - an action that completed before another moment or event in the past.\nForm: had + V3 for all faces.\nNegation: hadn't + V3\nQuestion: Had + subject + V3?\nTypical conjunctions: before, after, when, by the time, already, just, never",
    "formation": "By the time she arrived, he had already left.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "When I arrived, she had already left.",
        "translation": "When I arrived, she had already left."
      },
      {
        "sentence": "He had never seen snow before that winter.",
        "translation": "He had never seen snow before that winter."
      }
    ]
  },
  {
    "id": "en_b2_02",
    "language": "en",
    "pattern": "Past Perfect Continuous",
    "title": "Past Perfect Continuous: had been + V-ing",
    "shortExplanation": "He had been waiting for two hours when she arrived.",
    "longExplanation": "Past Perfect Continuous = had been + V-ing\nEmphasis on the duration of an action that occurred before another point in the past.\nOften explains a cause or visible result in the past.",
    "formation": "He had been waiting for two hours when she arrived.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "She was exhausted — she'd been working all night.",
        "translation": "She was exhausted - she had worked all night."
      },
      {
        "sentence": "How long had you been waiting before she arrived?",
        "translation": "How long did you wait before she arrived?"
      }
    ]
  },
  {
    "id": "en_b2_03",
    "language": "en",
    "pattern": "must have + V3",
    "title": "must have + V3 - confident conclusion about the past",
    "shortExplanation": "She must have forgotten. - I'm sure this is the only explanation",
    "longExplanation": "must have + V3 = I'm sure this happened (the only logical explanation).\nConfidence scale:\n• must have done - almost certainly happened\n• should have done - it was expected to happen\n• may/might have done - it may have happened\n• can't have done - it probably didn't happen",
    "formation": "She must have forgotten. - I'm sure this is the only explanation",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "You must have been exhausted after that journey.",
        "translation": "You must be very tired after this trip."
      },
      {
        "sentence": "She must have left early — her coat is gone.",
        "translation": "She apparently left early - her coat was missing."
      }
    ]
  },
  {
    "id": "en_b2_04",
    "language": "en",
    "pattern": "can't have + V3",
    "title": "can't have + V3 - impossibility in the past",
    "shortExplanation": "She can't have said that! He can't have been there.",
    "longExplanation": "can't have + V3 = I'm sure this didn't happen (it's impossible).\nThe opposite of must have done.",
    "formation": "She can't have said that! He can't have been there.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "He can't have seen her — she was abroad.",
        "translation": "He couldn't see her - she was abroad."
      },
      {
        "sentence": "That can't have been the right address.",
        "translation": "This could not be the correct address."
      }
    ]
  },
  {
    "id": "en_b2_05",
    "language": "en",
    "pattern": "should have + V3",
    "title": "should have + V3 - reproach and regret",
    "shortExplanation": "I should have called. You shouldn't have said that.",
    "longExplanation": "should have + V3 = it would have been right to do it, but I didn’t (regret, reproach).\nshouldn't have + V3 = shouldn't have done.\nThis is a very common construction for expressing regret and criticism.",
    "formation": "I should have called. You shouldn't have said that.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I should have brought an umbrella.",
        "translation": "I should have taken an umbrella."
      },
      {
        "sentence": "She shouldn't have told him the secret.",
        "translation": "She shouldn't have told him the secret."
      }
    ]
  },
  {
    "id": "en_b2_06",
    "language": "en",
    "pattern": "might / could have + V3",
    "title": "might / could have + V3 - possibility in the past",
    "shortExplanation": "She might have forgotten. It could have been worse.",
    "longExplanation": "might/could have + V3 = this may have happened (we don't know for sure).\nAlso: could have done = could have done (but didn’t): I could have won if I had tried harder.",
    "formation": "She might have forgotten. It could have been worse.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "She might have forgotten about the meeting.",
        "translation": "Perhaps she forgot about the meeting."
      },
      {
        "sentence": "He could have left through the back door.",
        "translation": "He could have gone out the back door."
      }
    ]
  },
  {
    "id": "en_b2_07",
    "language": "en",
    "pattern": "3rd type of conditional",
    "title": "3rd type of conditional: If + Past Perfect, would have + V3",
    "shortExplanation": "If I had studied harder, I would have passed.",
    "longExplanation": "An unreal situation in the past - we are talking about something that did not happen.\nForm: If + Past Perfect, would have + V3\nBoth elements are unreal:\n• Condition not met\n• There was no result either",
    "formation": "If I had studied harder, I would have passed.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "If she had taken the medicine, she would have recovered.",
        "translation": "If she took the medicine, she would get better."
      },
      {
        "sentence": "If he hadn't left early, he would have met her.",
        "translation": "If he hadn't left early, he would have met her."
      }
    ]
  },
  {
    "id": "en_b2_08",
    "language": "en",
    "pattern": "Mixed conditionals",
    "title": "Mixed conditionals",
    "shortExplanation": "If I had studied, I would be fluent now. (past → present)",
    "longExplanation": "Mixed conditionals connect different time plans:\n1. Past condition → present result:\nIf + Past Perfect, would + infinitive\nIf I had taken that job, I would be in New York now.\n2. Present condition → past result:\nIf + Past Simple, would have + V3\nIf she were more careful, she wouldn't have broken it.",
    "formation": "If I had studied, I would be fluent now. (past → present)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "If I had studied medicine, I would be a doctor now.",
        "translation": "If I had studied to become a doctor, I would be a doctor now."
      }
    ]
  },
  {
    "id": "en_b2_09",
    "language": "en",
    "pattern": "Future Passive and Passive with modals",
    "title": "Future Passive and Passive with modals",
    "shortExplanation": "It will be done. It must be fixed. It should be checked.",
    "longExplanation": "Modal + Passive: modal + be + V3\n• will be done - will be done\n• must be done - must be done\n• should be done - should be done\n• can be done - can be done",
    "formation": "It will be done. It must be fixed. It should be checked.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The report will be published tomorrow.",
        "translation": "The report will be published tomorrow."
      },
      {
        "sentence": "This mistake must be corrected immediately.",
        "translation": "This error must be corrected immediately."
      }
    ]
  },
  {
    "id": "en_b2_10",
    "language": "en",
    "pattern": "Causative have/get",
    "title": "Causative have/get: have something done",
    "shortExplanation": "I had my hair cut. She got her car fixed.",
    "longExplanation": "have/get + object + V3 - you order a service or someone does something for you.\nCompare:\n• I cut my hair. - I cut my hair myself (which is not typical)\n• I had my hair cut. - cut by a hairdresser\nget is a little more conversational, have is a little more formal.",
    "formation": "I had my hair cut. She got her car fixed.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I need to have my teeth checked.",
        "translation": "I need to have my teeth checked by a doctor."
      },
      {
        "sentence": "She had her house painted last spring.",
        "translation": "Last spring she painted the house (hiring workers)."
      }
    ]
  },
  {
    "id": "en_b2_11",
    "language": "en",
    "pattern": "Passive reporting verbs",
    "title": "Passive reporting verbs: It is said that... / He is believed to...",
    "shortExplanation": "It is thought that prices will rise. She is known to be honest.",
    "longExplanation": "Two construction options with the verbs say, think, believe, report, know, expect, consider:\n1. It + passive + that + subordinate clause: It is believed that...\n2. Subject + is + V3 + to-infinitive: She is believed to be...\nUsed in news and official texts.",
    "formation": "It is thought that prices will rise. She is known to be honest.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "It is reported that three people were injured.",
        "translation": "Three people were reported injured."
      },
      {
        "sentence": "He is thought to have left the country.",
        "translation": "He is believed to have left the country."
      }
    ]
  },
  {
    "id": "en_b2_12",
    "language": "en",
    "pattern": "remember / forget + V-ing vs to-inf",
    "title": "remember / forget + V-ing vs to-inf - difference in meaning",
    "shortExplanation": "I remember locking it (fact of the past) vs Remember to lock it (task)",
    "longExplanation": "remember/forget + V-ing - about a past event that we remember/forgot.\nremember/forget + to-inf - about the task: remember to do something in the future.",
    "formation": "I remember locking it (fact of the past) vs Remember to lock it (task)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I remember meeting her at a conference. (это было)",
        "translation": "I remember meeting her at a conference."
      },
      {
        "sentence": "Remember to call your mother! (нужно сделать)",
        "translation": "Don't forget to call your mom!"
      },
      {
        "sentence": "I forgot to buy milk. (не сделал)",
        "translation": "I forgot to buy milk."
      }
    ]
  },
  {
    "id": "en_b2_13",
    "language": "en",
    "pattern": "stop / regret / mean + V-ing vs to-inf",
    "title": "stop / regret / mean + V-ing vs to-inf",
    "shortExplanation": "She stopped smoking vs She stopped to smoke",
    "longExplanation": "stop + V-ing - stop the action.\nstop + to-inf - stop to do something else.\nregret + V-ing - to regret the past.\nregret + to-inf - regret to inform you (formally): I regret to inform you...\nmean + V-ing - mean: This means working harder.\nmean + to-inf - intend: I meant to call you.",
    "formation": "She stopped smoking vs She stopped to smoke",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "He stopped smoking last year.",
        "translation": "He quit smoking last year."
      },
      {
        "sentence": "She stopped to look at the view.",
        "translation": "She stopped to admire the view."
      }
    ]
  },
  {
    "id": "en_b2_14",
    "language": "en",
    "pattern": "wish + Past Simple",
    "title": "wish + Past Simple - desire to change the present",
    "shortExplanation": "I wish I knew the answer. I wish I had more time.",
    "longExplanation": "wish + Past Simple - about an unrealistic desire in the present.\nThe form is the same as in the 2nd type of conditional. For to be - were (formally), although was is also used.",
    "formation": "I wish I knew the answer. I wish I had more time.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I wish I spoke better English.",
        "translation": "It's a pity that I don't speak English better."
      },
      {
        "sentence": "She wishes she lived in a warmer country.",
        "translation": "She would like to live in a warmer country."
      }
    ]
  },
  {
    "id": "en_b2_15",
    "language": "en",
    "pattern": "wish + Past Perfect",
    "title": "wish + Past Perfect - regret about the past",
    "shortExplanation": "I wish I had studied harder. I wish I hadn't said that.",
    "longExplanation": "wish + Past Perfect - regret about past events that cannot be changed. The form is as in the 3rd type of conditional.",
    "formation": "I wish I had studied harder. I wish I hadn't said that.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I wish I hadn't eaten so much.",
        "translation": "It's a shame I ate so much."
      },
      {
        "sentence": "She wishes she had taken that job offer.",
        "translation": "She wishes she had accepted that job offer."
      }
    ]
  },
  {
    "id": "en_b2_16",
    "language": "en",
    "pattern": "wish + would",
    "title": "wish + would - desire to change someone else's behavior",
    "shortExplanation": "I wish you would stop talking. I wish it would warm up.",
    "longExplanation": "wish + would - irritation due to someone else's behavior or a desire to change the situation.",
    "formation": "I wish you would stop talking. I wish it would warm up.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I wish you would listen to me.",
        "translation": "I wish you would listen to me."
      },
      {
        "sentence": "I wish it would stop raining.",
        "translation": "I wish the rain would stop."
      }
    ]
  },
  {
    "id": "en_b2_17",
    "language": "en",
    "pattern": "Defining vs non-defining clauses",
    "title": "Defining vs non-defining clauses",
    "shortExplanation": "The man who called (determines which one) vs My brother, who called, (adds info)",
    "longExplanation": "Defining (defining): without commas - they clarify who/what they are talking about. The pronoun can be replaced with that. It cannot be removed without losing the meaning.\nNon-defining: with commas - add information without changing the meaning. That cannot be used. Can be removed.",
    "formation": "The man who called (determines which one) vs My brother, who called, (adds info)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The film that I told you about is on tonight. (какой именно)",
        "translation": "The movie I told you about is showing tonight."
      },
      {
        "sentence": "My sister, who lives in Paris, is visiting next week. (доп. инфо)",
        "translation": "My sister, who lives in Paris, will arrive next week."
      }
    ]
  },
  {
    "id": "en_b2_18",
    "language": "en",
    "pattern": "Prepositions in relative clauses",
    "title": "Prepositions in relative clauses",
    "shortExplanation": "the person I work with / the person with whom I work (formally)",
    "longExplanation": "In colloquial speech, the preposition comes at the end: the house I grew up in.\nIn written/formal speech, the preposition before which/whom: the house in which I grew up.\nAfter the preposition - only which (for things) and whom (for people). Never that!",
    "formation": "the person I work with / the person with whom I work (formally)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The project I'm working on is fascinating. (разг.)",
        "translation": "The project I'm working on is very interesting."
      },
      {
        "sentence": "The project on which I am working is fascinating. (форм.)",
        "translation": ""
      }
    ]
  },
  {
    "id": "en_b2_19",
    "language": "en",
    "pattern": "Consequence conjunctions",
    "title": "Consequence conjunctions: so... that, such... that, therefore, as a result",
    "shortExplanation": "It was so cold that we stayed inside. She worked hard; therefore, she passed.",
    "longExplanation": "so + adjective/adverb + that: He spoke so quickly that nobody understood.\nsuch + (a/an) + adjective + noun + that: It was such a long film that I fell asleep.\nConnecting words of result (between sentences): therefore, consequently, as a result, hence, thus.",
    "formation": "It was so cold that we stayed inside. She worked hard; therefore, she passed.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "It was such a good book that I read it twice.",
        "translation": "The book was so good that I read it twice."
      },
      {
        "sentence": "She missed the deadline; consequently, she lost the contract.",
        "translation": "She missed the deadline; As a result, she lost her contract."
      }
    ]
  },
  {
    "id": "en_b2_20",
    "language": "en",
    "pattern": "be used to / get used to + V-ing",
    "title": "be used to / get used to + V-ing - habit (real)",
    "shortExplanation": "I'm used to waking up early. She's getting used to the cold.",
    "longExplanation": "be used to + V-ing / noun = to be used to (already used to).\nget used to + V-ing / noun = get used to (the process of getting used to).\n• I used to live in Paris. - used to live (no longer)\n• I am used to living in big cities. - used to living in big cities",
    "formation": "I'm used to waking up early. She's getting used to the cold.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I'm not used to getting up so early.",
        "translation": "I'm not used to getting up so early."
      },
      {
        "sentence": "It took time, but she got used to the new system.",
        "translation": "It took time, but she got used to the new system."
      }
    ]
  },
  {
    "id": "en_b2_21",
    "language": "en",
    "pattern": "Future in the Past",
    "title": "Future in the Past: would / was going to",
    "shortExplanation": "She said she would call. He was going to leave.",
    "longExplanation": "Future in the Past - constructions that express the future from the point of view of the past. Used in indirect speech and narrative.\n• would + V (from will): She said she would come.\n• was/were going to + V: He was going to call but forgot.\n• was about to + V: She was about to leave when he arrived.",
    "formation": "She said she would call. He was going to leave.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "She promised she would be there.",
        "translation": "She promised that she would come."
      },
      {
        "sentence": "He was about to leave when she called.",
        "translation": "He was about to leave when she called."
      }
    ]
  },
  {
    "id": "en_b2_22",
    "language": "en",
    "pattern": "be to",
    "title": "be to - official appointment and order",
    "shortExplanation": "You are to report by Monday. They were never to meet again.",
    "longExplanation": "be to + infinitive - official orders, planned events and fate in the narrative.\n1. Legal Instruction: Passengers are to remain seated.\n2. Official plan: The summit is to take place next month.\n3. Fate in the narrative: They were never to meet again.",
    "formation": "You are to report by Monday. They were never to meet again.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "You are to submit the report by Friday.",
        "translation": "You must submit your report by Friday."
      },
      {
        "sentence": "She was to become one of the greatest scientists of her time.",
        "translation": "She was destined to become one of the greatest scientists."
      }
    ]
  },
  {
    "id": "en_b2_23",
    "language": "en",
    "pattern": "ought to",
    "title": "ought to - moral duty and logical expectation",
    "shortExplanation": "You ought to apologise. She ought to have told us.",
    "longExplanation": "ought to is a moral obligation or logical expectation. Stronger should.\nAlways with to: ought to go (as opposed to should).\nFor the past: ought to have + V3 - reproach or regret.",
    "formation": "You ought to apologise. She ought to have told us.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "You ought to apologise for what you said.",
        "translation": "You should apologize for what you said."
      },
      {
        "sentence": "She ought to have told us earlier.",
        "translation": "She should have told us sooner."
      }
    ]
  },
  {
    "id": "en_b2_24",
    "language": "en",
    "pattern": "need",
    "title": "need - modal and regular verb",
    "shortExplanation": "You needn't worry. / She doesn't need to come.",
    "longExplanation": "need as a modal (formal, in questions/negations) and as a regular verb.\nModal (without -s, without to):\n• You needn't worry. / Need I explain?\nRegular need + to:\n• She doesn't need to come.",
    "formation": "You needn't worry. / She doesn't need to come.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "You needn't fill in both forms.",
        "translation": "You do not need to fill out both forms."
      },
      {
        "sentence": "She doesn't need to attend every meeting.",
        "translation": "She does not have to attend every meeting."
      }
    ]
  },
  {
    "id": "en_b2_25",
    "language": "en",
    "pattern": "dare",
    "title": "dare - courage and challenge",
    "shortExplanation": "How dare you! I daren't ask. She dared to challenge him.",
    "longExplanation": "dare - dare, dare. Modal in rhetorical questions and negations.\nModal: How dare you! / I daren't ask. / Dare I say...\nNormal: She didn't dare to look. / He dared to challenge the boss.",
    "formation": "How dare you! I daren't ask. She dared to challenge him.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "How dare you speak to me like that!",
        "translation": "How dare you talk to me like that!"
      },
      {
        "sentence": "She dared to express her opinion openly.",
        "translation": "She dared to openly express her opinion."
      }
    ]
  },
  {
    "id": "en_b2_26",
    "language": "en",
    "pattern": "Reflexive pronouns",
    "title": "Reflexive pronouns: myself, yourself, himself...",
    "shortExplanation": "I hurt myself. She did it herself. They enjoyed themselves.",
    "longExplanation": "myself, yourself, yourself, yourself, yourself, yourself, yourselves, yourself.\n1. The action is directed towards the subject: He cut himself.\n2. Emphase (by yourself, without help): I did it myself.\nStable: by myself = alone; help yourself = help yourself.",
    "formation": "I hurt myself. She did it herself. They enjoyed themselves.",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "She taught herself to play the guitar.",
        "translation": "She taught herself to play the guitar."
      },
      {
        "sentence": "The machine turns itself off automatically.",
        "translation": "The machine turns off automatically."
      }
    ]
  },
  {
    "id": "en_b2_27",
    "language": "en",
    "pattern": "Collective nouns",
    "title": "Collective nouns: team, family, committee...",
    "shortExplanation": "The team are playing well. (BrE) / The team is playing. (AmE)",
    "longExplanation": "Collective nouns are a group as a whole.\n• BrE: usually plural. number: The team are playing.\n• AmE: usually units. number: The team is playing.\nFrequent: team, family, government, committee, staff, audience, crew, police, army, public, management",
    "formation": "The team are playing well. (BrE) / The team is playing. (AmE)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The government have announced new measures. (BrE)",
        "translation": "The government announced new measures."
      },
      {
        "sentence": "The audience were on their feet. (BrE)",
        "translation": "The audience jumped to their feet."
      }
    ]
  },
  {
    "id": "en_b2_28",
    "language": "en",
    "pattern": "Fractions and mathematics",
    "title": "Fractions and mathematics",
    "shortExplanation": "a half, three quarters, 5.7 = five point seven, 25%",
    "longExplanation": "Fractions:½ = a half; ⅓ = a third; ¼ = a quarter; ¾ = three quarters; ⅔ = two thirds.\nNumerator is quantitative, denominator is ordinal (plural if numerator > 1).\nDecimals: period (not comma): 3.14 = three point one four.\nMathematics: + = plus; - = minus; × = times; ÷ = divided by; = = equals.",
    "formation": "a half, three quarters, 5.7 = five point seven, 25%",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Three quarters of students passed the exam.",
        "translation": "Three quarters of the students passed the exam."
      },
      {
        "sentence": "The inflation rate fell to 2.5 percent.",
        "translation": "The inflation rate dropped to 2.5 percent."
      }
    ]
  },
  {
    "id": "en_b2_29",
    "language": "en",
    "pattern": "Degrees of comparison of adverbs",
    "title": "Degrees of comparison of adverbs",
    "shortExplanation": "faster, more carefully, best, worse, further",
    "longExplanation": "Adverbs form degrees of comparison according to the same rules as adjectives.\n• Monosyllabic: + er/est: fast→faster, hard→harder, early→earlier\n• Most on -ly: more/most: carefully→more carefully→most carefully\n• Incorrect: well→better→best, badly→worse→worst, far→further→furthest, little→less→least, much→more→most",
    "formation": "faster, more carefully, best, worse, further",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "She spoke more confidently than before.",
        "translation": "She spoke more confidently than before."
      },
      {
        "sentence": "He works hardest in the team.",
        "translation": "He works harder than anyone on the team."
      }
    ]
  },
  {
    "id": "en_c1_01",
    "language": "en",
    "pattern": "Inversion with negative adverbs",
    "title": "Inversion with negative adverbs",
    "shortExplanation": "Never have I seen this. Rarely does she complain.",
    "longExplanation": "For emphasis, the negative adverb/expression is placed at the beginning → auxiliary verb before the subject (word order as in a question).\nWords that trigger inversion: never, rarely, rarely, little, hardly, scarcely, barely, not only, only, no sooner",
    "formation": "Never have I seen this. Rarely does she complain.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Never have I seen anything so beautiful.",
        "translation": "I have never seen anything so beautiful."
      },
      {
        "sentence": "Rarely does she make a mistake.",
        "translation": "She rarely makes mistakes."
      },
      {
        "sentence": "Little did I know what was coming.",
        "translation": "I had no idea what was waiting for me."
      }
    ]
  },
  {
    "id": "en_c1_02",
    "language": "en",
    "pattern": "Not only... but also with inversion",
    "title": "Not only... but also with inversion",
    "shortExplanation": "Not only did he apologise, but he also offered to help.",
    "longExplanation": "Not only + inversion in the first part, the second part is the usual order.\nUsed for emphasis: expresses that something went further than expected.",
    "formation": "Not only did he apologise, but he also offered to help.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Not only is she talented, but she is also very hard-working.",
        "translation": "She is not only talented, but also very hardworking."
      },
      {
        "sentence": "Not only did they arrive late, but they also forgot the documents.",
        "translation": "They were not only late, but also forgot their documents."
      }
    ]
  },
  {
    "id": "en_c1_03",
    "language": "en",
    "pattern": "Hardly / Scarcely / No sooner + inversion",
    "title": "Hardly / Scarcely / No sooner + inversion",
    "shortExplanation": "Hardly had I sat down when the phone rang.",
    "longExplanation": "Immediate sequence constructions:\n• Hardly/Scarcely + had + subject + V3 + when/before + Past Simple\n• No sooner + had + subject + V3 + than + Past Simple",
    "formation": "Hardly had I sat down when the phone rang.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Hardly had she arrived when it started to rain.",
        "translation": "She had barely arrived when it started to rain."
      },
      {
        "sentence": "No sooner had I sat down than someone knocked at the door.",
        "translation": "I had just sat down when someone knocked on the door."
      }
    ]
  },
  {
    "id": "en_c1_04",
    "language": "en",
    "pattern": "Inversion in conditionals",
    "title": "Inversion in conditionals: Had / Were / Should",
    "shortExplanation": "Had I known (= If I had known). Were I you (= If I were you).",
    "longExplanation": "Formal style - excludes if, uses inversion:\n• Had + subject + V3 = If + Past Perfect (3rd type)\n• Were + subject (+ to + infinitive) = If + Past Simple (2nd type)\n• Should + subject + infinitive = If (unlikely, type 1)",
    "formation": "Had I known (= If I had known). Were I you (= If I were you).",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Had she told me, I would have helped.",
        "translation": "If she had told me, I would have helped."
      },
      {
        "sentence": "Were I in your position, I would accept.",
        "translation": "If I were you, I would agree."
      },
      {
        "sentence": "Should you need assistance, please call us.",
        "translation": "If you need assistance, call us."
      }
    ]
  },
  {
    "id": "en_c1_05",
    "language": "en",
    "pattern": "It-cleft",
    "title": "It-cleft: It was John who called.",
    "shortExplanation": "To highlight any member of a sentence",
    "longExplanation": "Structure: It + to be + selected element + who/that/which + rest\nShifts the focus of attention to the highlighted element.\n• For people - who; for things/circumstances - that/which.",
    "formation": "To highlight any member of a sentence",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "It was the noise that woke me up. (не шум вообще, именно этот)",
        "translation": "It was the noise that woke me up."
      },
      {
        "sentence": "It is hard work that leads to success.",
        "translation": "It is hard work that leads to success."
      }
    ]
  },
  {
    "id": "en_c1_06",
    "language": "en",
    "pattern": "Wh-cleft",
    "title": "Wh-cleft: What surprised me was the price.",
    "shortExplanation": "What I need is rest. What she said shocked everyone.",
    "longExplanation": "Structure: What + subordinate clause + to be + highlighted element\nEmphasizes the importance of the element introduced at the end.",
    "formation": "What I need is rest. What she said shocked everyone.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "What I love about London is the diversity.",
        "translation": "What I like most about London is the diversity."
      },
      {
        "sentence": "What he did was completely unexpected.",
        "translation": "What he did was completely unexpected."
      }
    ]
  },
  {
    "id": "en_c1_07",
    "language": "en",
    "pattern": "Formal subjunctive after verbs of demand",
    "title": "Formal subjunctive after verbs of demand",
    "shortExplanation": "I suggest he leave. It is vital that she be informed.",
    "longExplanation": "After suggest, recommend, insist, demand, propose, request, require, ask, advise, order + that - the basic form of the verb for all persons (without -s, without was).\nThe British version often uses should instead of the subjunctive: I suggest that he should leave.\nAmerican - often a pure subjunctive.",
    "formation": "I suggest he leave. It is vital that she be informed.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "I recommend that he see a doctor.",
        "translation": "I recommend that he see a doctor."
      },
      {
        "sentence": "It is essential that all students attend the meeting.",
        "translation": "It is essential that all students attend the meeting."
      }
    ]
  },
  {
    "id": "en_c1_08",
    "language": "en",
    "pattern": "It's high time + Past Simple",
    "title": "It's high time + Past Simple",
    "shortExplanation": "It's high time you went to bed. It's time we left.",
    "longExplanation": "It's (high/about) time + subject + Past Simple\nMeaning: present/future - we are talking about something that should have been done a long time ago.\nhigh time - even stronger: it’s high time!",
    "formation": "It's high time you went to bed. It's time we left.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "It's time she found a new job.",
        "translation": "It's high time she found a new job."
      },
      {
        "sentence": "It's high time you apologised.",
        "translation": "It's high time to apologize."
      }
    ]
  },
  {
    "id": "en_c1_09",
    "language": "en",
    "pattern": "as if / as though + subjunctive",
    "title": "as if / as though + subjunctive",
    "shortExplanation": "She talks as if she knew everything. He looked as though he had seen a ghost.",
    "longExplanation": "as if / as though + Past Simple is an unrealistic comparison in the present.\nas if / as though + Past Perfect is an unrealistic comparison about the past.",
    "formation": "She talks as if she knew everything. He looked as though he had seen a ghost.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "He spends money as if he were a millionaire.",
        "translation": "He spends money like he's a millionaire."
      },
      {
        "sentence": "She spoke as though she had met him before.",
        "translation": "She spoke as if she had met him before."
      }
    ]
  },
  {
    "id": "en_c1_10",
    "language": "en",
    "pattern": "So / Neither + auxiliary verb + subject",
    "title": "So / Neither + auxiliary verb + subject",
    "shortExplanation": "So do I. Neither does she. So am I.",
    "longExplanation": "So + auxiliary + subject - agreement with the affirmative.\nNeither/Nor + auxiliary + subject - agreement with the negative.\nThe auxiliary verb must coincide with the tense of the original sentence.",
    "formation": "So do I. Neither does she. So am I.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "I love jazz. So does she.",
        "translation": "I love jazz. She too."
      },
      {
        "sentence": "I haven't been to Rome. Neither have I.",
        "translation": "I haven't been to Rome. Me too."
      }
    ]
  },
  {
    "id": "en_c1_11",
    "language": "en",
    "pattern": "I think so / I hope so / I'm afraid so",
    "title": "I think so / I hope so / I'm afraid so",
    "shortExplanation": "Will it rain? - I think so. / I hope not.",
    "longExplanation": "so replaces the subordinate clause after: think, hope, suppose, expect, believe, imagine, be afraid.\nNegative form: not (not so not!).",
    "formation": "Will it rain? - I think so. / I hope not.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Will he come? — I think so. / I don't think so.",
        "translation": "Will he come? - I think yes. / Don't think."
      },
      {
        "sentence": "Is it expensive? — I'm afraid so.",
        "translation": "Is it expensive? - I'm afraid so."
      },
      {
        "sentence": "Is it closed? — I hope not.",
        "translation": "Closed? - I hope not."
      }
    ]
  },
  {
    "id": "en_c1_12",
    "language": "en",
    "pattern": "Inclusive vs non-inclusive clauses",
    "title": "Inclusive vs non-inclusive clauses",
    "shortExplanation": "The man who called is my brother. VS My brother, who called, is a doctor.",
    "longExplanation": "Defining: specifies who/what we are talking about - without commas. that is possible. The pronoun can be omitted if it is an object.\nNon-defining: adds information - commas required. Only who/which (not that!). The pronoun cannot be omitted.",
    "formation": "The man who called is my brother. VS My brother, who called, is a doctor.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "The film that won the Oscar was brilliant. (определяет, о каком фильме речь)",
        "translation": "The film that won the Oscar was great."
      },
      {
        "sentence": "Avatar, which came out in 2009, was a huge hit. (доп. факт о и так известном фильме)",
        "translation": "Avatar, released in 2009, became a big hit."
      }
    ]
  },
  {
    "id": "en_c1_13",
    "language": "en",
    "pattern": "Preposition + which/whom in formal style",
    "title": "Preposition + which/whom in formal style",
    "shortExplanation": "The company for which I work. The person with whom I spoke.",
    "longExplanation": "Formal style: preposition + which/whom before a relative pronoun.\nInformal equivalent: preposition at the end of a sentence.\nwhom is the formal object form of who.",
    "formation": "The company for which I work. The person with whom I spoke.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "The report to which I referred is attached. (формально)",
        "translation": "The report I mentioned is attached."
      },
      {
        "sentence": "The report which I referred to is attached. (нейтрально)",
        "translation": ""
      },
      {
        "sentence": "The report I referred to is attached. (разговорно)",
        "translation": ""
      }
    ]
  },
  {
    "id": "en_c1_14",
    "language": "en",
    "pattern": "Nominalization",
    "title": "Nominalization - Basics",
    "shortExplanation": "decide→decision, discover→discovery, improve→improvement",
    "longExplanation": "Nominalization is the conversion of verbs/adjectives into nouns. A sign of academic and business style.\nMain suffixes:\n• -tion/-sion: decide→decision, discuss→discussion\n• -ment: improve→improvement, develop→development\n• -ance/-ence: appear→appearance, differ→difference\n• -ity: complex→complexity, able→ability\n• -ness: happy→happiness, aware→awareness",
    "formation": "decide→decision, discover→discovery, improve→improvement",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "She decided to expand. → Our decision to expand the company...",
        "translation": "Our decision to expand..."
      },
      {
        "sentence": "He discovered that... → His discovery of the error...",
        "translation": "His discovery of the error..."
      }
    ]
  },
  {
    "id": "en_c1_15",
    "language": "en",
    "pattern": "Nominalization in academic text",
    "title": "Nominalization in academic text",
    "shortExplanation": "The fact that prices increased → The increase in prices...",
    "longExplanation": "Nominalization allows:\n1. Compress information: There was a significant increase in prices.\n2. Add definitions: The rapid increase in house prices...\n3. Create a formal, impersonal tone.",
    "formation": "The fact that prices increased → The increase in prices...",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "There has been a significant improvement in air quality.",
        "translation": "Air quality has improved significantly."
      },
      {
        "sentence": "His refusal to comment surprised everyone.",
        "translation": "His refusal to comment surprised everyone."
      }
    ]
  },
  {
    "id": "en_c1_16",
    "language": "en",
    "pattern": "Present participle",
    "title": "Present participle: V-ing clause",
    "shortExplanation": "Walking down the street, I saw an old friend. Having no money, he couldn't buy food.",
    "longExplanation": "The participial phrase with Present Participle (V-ing) replaces the subordinate clause:\n• Simultaneity: Walking home, I noticed something strange. (= While I was walking home)\n• Reason: Knowing the answer, she raised her hand. (= Because she knew)\nError: Walking down the street, the rain started. (the rain did not fall on the street)",
    "formation": "Walking down the street, I saw an old friend. Having no money, he couldn't buy food.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Arriving at the airport, he realised he had forgotten his passport.",
        "translation": "Arriving at the airport, he realized that he had forgotten his passport."
      },
      {
        "sentence": "Not knowing what to do, she called her mother.",
        "translation": "Not knowing what to do, she called her mother."
      }
    ]
  },
  {
    "id": "en_c1_17",
    "language": "en",
    "pattern": "Past participial phrase",
    "title": "Past participial phrase: V3 / Having + V3 clause",
    "shortExplanation": "Written in 1815, the novel... Having finished work, she went home.",
    "longExplanation": "V3 clause (Past Participle) = passive meaning: Built in 1889, the Eiffel Tower...\nHaving + V3 = action completed before the main one:\nHaving read the report, he called a meeting. (= After he had read...)",
    "formation": "Written in 1815, the novel... Having finished work, she went home.",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Surprised by the news, she sat down silently.",
        "translation": "Surprised by the news, she sat down silently."
      },
      {
        "sentence": "Having finished the exam, the students left the room.",
        "translation": "Having finished the exam, the students left the classroom."
      }
    ]
  },
  {
    "id": "en_c2_01",
    "language": "en",
    "pattern": "Conditional with unless / provided / as long as / on condition that",
    "title": "Conditional with unless / provided / as long as / on condition that",
    "shortExplanation": "Unless you study, you'll fail. As long as you're honest, I'll help.",
    "longExplanation": "unless = if not (but cannot be used with negation!): Unless you hurry = If you don't hurry\nprovided/providing (that) = if and only if (strict condition)\nas long as = provided that (assumption)\non condition that = on condition that (formally)\nin case = in case",
    "formation": "Unless you study, you'll fail. As long as you're honest, I'll help.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "I'll lend you money, as long as you pay me back.",
        "translation": "I'll lend you money on the condition that you pay it back."
      },
      {
        "sentence": "You can use my laptop, provided you don't download anything.",
        "translation": "You can use my laptop, as long as you don't download anything."
      }
    ]
  },
  {
    "id": "en_c2_02",
    "language": "en",
    "pattern": "Suppose / supposing / what if",
    "title": "Suppose / supposing / what if",
    "shortExplanation": "Suppose you won the lottery - what would you do?",
    "longExplanation": "Suppose/Supposing - used as if in hypothetical questions.\nWhat if is an informal analogue.\nWith Past Simple - a situation is unlikely or imaginary.",
    "formation": "Suppose you won the lottery - what would you do?",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Supposing you had to choose — which would you pick?",
        "translation": "Imagine that you had to choose - what would you choose?"
      },
      {
        "sentence": "What if nobody comes? What should we do?",
        "translation": "What if no one comes? What should we do?"
      }
    ]
  },
  {
    "id": "en_c2_03",
    "language": "en",
    "pattern": "Only + circumstance + inversion",
    "title": "Only + circumstance + inversion",
    "shortExplanation": "Only when I left did I realize. Only then did he understand.",
    "longExplanation": "Only + when/after/if/then/by/in/on - the entire group is moved to the beginning → inversion.\nThis is one of the most powerful rhetorical devices in writing and public speaking.",
    "formation": "Only when I left did I realize. Only then did he understand.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Only when you experience it can you truly understand.",
        "translation": "Only by experiencing it can one truly understand."
      },
      {
        "sentence": "Only after years of practice did she master the skill.",
        "translation": "It was only after years of practice that she mastered the skill."
      }
    ]
  },
  {
    "id": "en_c2_04",
    "language": "en",
    "pattern": "So + adjective/adverb + inversion",
    "title": "So + adjective/adverb + inversion",
    "shortExplanation": "So great was his relief that he wept. Such was her talent...",
    "longExplanation": "Book and oratorical style.\nSo + adj/adv + be/aux + subject\nSuch + was/were + subject",
    "formation": "So great was his relief that he wept. Such was her talent...",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "So rapid was the change that nobody could adapt.",
        "translation": "The changes happened so quickly that no one could adapt."
      },
      {
        "sentence": "Such was her talent that she was offered a scholarship.",
        "translation": "So great was her talent that she was offered a scholarship."
      }
    ]
  },
  {
    "id": "en_c2_05",
    "language": "en",
    "pattern": "Hedging",
    "title": "Hedging: appear to, seem to, tend to, be likely to",
    "shortExplanation": "Prices appear to be rising. This tends to occur when...",
    "longExplanation": "Hedging is the deliberate softening of statements to express scientific modesty.\nMain structures:\n• appear/seem to - apparently\n• tend to - as a rule, tend to\n• be likely/unlikely to - likely/unlikely\n• be thought/considered to be - it is believed that",
    "formation": "Prices appear to be rising. This tends to occur when...",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "The results appear to suggest a correlation.",
        "translation": "The results appear to indicate a correlation."
      },
      {
        "sentence": "Companies tend to underestimate implementation costs.",
        "translation": "Companies tend to underestimate implementation costs."
      }
    ]
  },
  {
    "id": "en_c2_06",
    "language": "en",
    "pattern": "Discourse markers in academic text",
    "title": "Discourse markers in academic text",
    "shortExplanation": "Furthermore, Nevertheless, Conversely, In light of, With regard to",
    "longExplanation": "Markers structure and connect academic text:\n• Addition: Moreover, Furthermore, In addition, Additionally\n• Contrast: However, nevertheless, nevertheless, Conversely, On the other hand\n• Result: Therefore, Consequently, As a result, Hence, Thus\n• Explanation: In other words, That is to say, Namely\n• Concession: Admittedly, While it is true that, Despite this",
    "formation": "Furthermore, Nevertheless, Conversely, In light of, With regard to",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "The experiment failed. Nevertheless, the findings were instructive.",
        "translation": "The experiment failed. Still, the results were instructive."
      },
      {
        "sentence": "Furthermore, the data suggests a strong correlation.",
        "translation": "Moreover, the data suggests a strong correlation."
      }
    ]
  },
  {
    "id": "en_c2_07",
    "language": "en",
    "pattern": "Speech registers",
    "title": "Speech registers: formal, neutral, colloquial",
    "shortExplanation": "I would like to enquire... vs I'd like to ask... vs Can I ask...",
    "longExplanation": "Register is determined by purpose, audience and context.\nFormal: passive, nominalization, complex conjunctions, full forms, verbs of Latin origin (commence, terminate, assist).\nNeutral: standard grammar, no slang, moderate abbreviations.\nInformal: ellipsis, phrasal verbs (put off = postpone), contractions, colloquial expressions.",
    "formation": "I would like to enquire... vs I'd like to ask... vs Can I ask...",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Formal: I wish to draw your attention to a discrepancy.",
        "translation": ""
      },
      {
        "sentence": "Neutral: I want to point out a mistake.",
        "translation": ""
      },
      {
        "sentence": "Informal: Just wanted to flag something up.",
        "translation": ""
      }
    ]
  },
  {
    "id": "en_c2_08",
    "language": "en",
    "pattern": "Connotations of synonyms",
    "title": "Connotations of synonyms - shades of meaning",
    "shortExplanation": "thin/slim/slender/skinny/gaunt: positive→neutral→negative",
    "longExplanation": "Synonyms differ in connotation (emotional coloring) and register.\nExamples of scales:\n• slim (+) → thin (0) → skinny (-) → scrawny/gaunt (--)\n• determined (+) → firm (0) → stubborn/pig-headed (-)\n• thrifty (+) → economical (0) → stingy/tight-fisted (-)\n• confident (+) → assertive (0) → arrogant (-)",
    "formation": "thin/slim/slender/skinny/gaunt: positive→neutral→negative",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "She is slim. (+) / She is thin. (0) / She is skinny. (-)",
        "translation": "Same thing, but different attitude."
      }
    ]
  },
  {
    "id": "en_c2_09",
    "language": "en",
    "pattern": "Rhetorical devices",
    "title": "Rhetorical devices: anaphora, chiasmus, tricolon",
    "shortExplanation": "\"We shall fight on the beaches, we shall fight on the landing grounds...\" - anaphora",
    "longExplanation": "Anaphora: repetition of words at the beginning of successive sentences. \"I have a dream... I have a dream...\"\nChiasmus: AB-BA cross structure. \"Ask not what your country can do for you, but what you can do for your country.\"\nTricolon: three parallel elements. \"Veni, vidi, vici.\" / \"Government of the people, by the people, for the people.\"\nThese techniques are used in oratory, essays and journalism.",
    "formation": "\"We shall fight on the beaches, we shall fight on the landing grounds...\" - anaphora",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Friends, Romans, countrymen, lend me your ears. (триколон)",
        "translation": ""
      },
      {
        "sentence": "The more you learn, the more you earn. (хиазм в народной мудрости)",
        "translation": ""
      }
    ]
  },
  {
    "id": "en_c2_10",
    "language": "en",
    "pattern": "Precise collocations in academic text",
    "title": "Precise collocations in academic text",
    "shortExplanation": "conduct research, draw conclusions, reach a consensus, address an issue",
    "longExplanation": "In C2 it is important to use the 'correct' verb with each noun.\nAcademic collocations:\n• conduct/carry out research (not make/do)\n• draw/reach a conclusion\n• raise/address/tackle an issue\n• reach/achieve a consensus\n• make significant progress\n• pose/present a challenge",
    "formation": "conduct research, draw conclusions, reach a consensus, address an issue",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Researchers conducted extensive interviews.",
        "translation": "The researchers conducted extensive interviews."
      },
      {
        "sentence": "The committee failed to reach a consensus.",
        "translation": "The committee was unable to reach consensus."
      }
    ]
  },
  {
    "id": "en_c2_11",
    "language": "en",
    "pattern": "Absolute construction with participle",
    "title": "Absolute construction with participle",
    "shortExplanation": "Weather permitting, we'll have a picnic. Her eyes filled with tears, she left the room.",
    "longExplanation": "Absolute construction = noun/pronoun + participle (independent subject).\nUsed in written and formal style - adds a circumstance without a conjunction.\nTypes:\n• Weather permitting = If the weather permits\n• All things considered = If you consider everything\n• Her work finished = When/After her work was finished\n• This done = When/After this was done",
    "formation": "Weather permitting, we'll have a picnic. Her eyes filled with tears, she left the room.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "All things considered, it was a successful event.",
        "translation": "All things considered, it was a successful event."
      },
      {
        "sentence": "The deadline having passed, the project was cancelled.",
        "translation": "After the deadline passed, the project was cancelled."
      }
    ]
  },
  {
    "id": "en_c2_12",
    "language": "en",
    "pattern": "Ellipsis and substitution in connected text",
    "title": "Ellipsis and substitution in connected text",
    "shortExplanation": "I wanted to go but didn't (want to). She said she'd call and she did.",
    "longExplanation": "Ellipsis is the omission of already known elements.\nSubstitution - using do/so/one/it instead of repeating.\nEllipse types:\n• A: Are you coming? B: Might (do).\n• She speaks French and he does too / so does he.\n• I wanted to leave, but wasn't allowed to. (leave omitted)\nSubstitution: I thought he'd pass. He did. / The big one? I prefer the small one",
    "formation": "I wanted to go but didn't (want to). She said she'd call and she did.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Can you drive? — I used to (drive).",
        "translation": "Can you drive? - I used to be able to."
      },
      {
        "sentence": "She said she'd be here and she was.",
        "translation": "She said she would come, and she came."
      }
    ]
  },
  {
    "id": "en_c2_13",
    "language": "en",
    "pattern": "Infinitive phrases instead of subordinate clauses",
    "title": "Infinitive phrases instead of subordinate clauses",
    "shortExplanation": "I want you to explain. She asked me to help. He doesn't seem to be happy.",
    "longExplanation": "Complex infinitive (Complex Object) replaces the subordinate clause:\nI want + object + to-infinitive: I want her to stay.\nAfter see, hear, watch, let, make, have - infinitive without to:\nI saw her leave. / She made him cry. / Let me help.\nIn the passive - with to: He was made to pay.\nConstructions with seem, appear, happen, prove + to-inf:\nShe seems to know. / He happened to be there.",
    "formation": "I want you to explain. She asked me to help. He doesn't seem to be happy.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "I need you to sign this document.",
        "translation": "I need you to sign this document."
      },
      {
        "sentence": "She was made to apologise publicly.",
        "translation": "She was forced to publicly apologize."
      },
      {
        "sentence": "He seemed to have forgotten everything.",
        "translation": "He seemed to have forgotten everything."
      }
    ]
  },
  {
    "id": "en_c2_14",
    "language": "en",
    "pattern": "Future Perfect Continuous",
    "title": "Future Perfect Continuous: will have been + V-ing",
    "shortExplanation": "By next year, I will have been studying English for five years.",
    "longExplanation": "Future Perfect Continuous = will have been + V-ing\nEmphasis on the duration of an action that will last until a certain point in the future. Often answers the question “How long by then?”\nOften used with by (the time), for, when: By Monday, she will have been working on this project for three weeks.",
    "formation": "By next year, I will have been studying English for five years.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "By next year, I will have been learning English for five years.",
        "translation": "By next year I will have been studying English for five years."
      },
      {
        "sentence": "When we arrive, she will have been waiting for two hours.",
        "translation": "When we arrive, she will already have been waiting for two hours."
      }
    ]
  },
  {
    "id": "en_c2_15",
    "language": "en",
    "pattern": "Coordination of tenses",
    "title": "Coordination of tenses - sequence of tenses",
    "shortExplanation": "She said she had been working. He thought it would be difficult.",
    "longExplanation": "In complex sentences, the verb of the subordinate clause agrees in time with the main one.\nIf the main verb is in the past:\n• Present Simple → Past Simple: he said it was true\n• Past Simple → Past Perfect: she said she had seen it\n• Present Perfect → Past Perfect: he said he had finished\n• will → would; can → could; may → might; is → was",
    "formation": "She said she had been working. He thought it would be difficult.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "He told me that he had been living there for years.",
        "translation": "He told me that he had lived there for many years."
      },
      {
        "sentence": "She said the Earth moves around the Sun. (общая истина — не меняем)",
        "translation": "She said that the Earth moves around the Sun."
      }
    ]
  },
  {
    "id": "en_c2_16",
    "language": "en",
    "pattern": "Coordinating conjunctions",
    "title": "Coordinating conjunctions: and, but, or, nor, for, yet, so",
    "shortExplanation": "FANBOYS: For, And, Nor, But, Or, Yet, So",
    "longExplanation": "Coordinating conjunctions connect equivalent parts of a sentence.\nSeven Basic (acronym FANBOYS):\n• for = because (formal): She left, for she was tired.\n• and = and (adding)\n• nor = and not (Neither/Nor... inversion!): She didn't call, nor did she write.\n• but = but (contrast)\n• or = or (alternative)\n• yet = however (contrast, more formal but)\n• so = therefore (consequence)",
    "formation": "FANBOYS: For, And, Nor, But, Or, Yet, So",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "She was tired, yet she kept working.",
        "translation": "She was tired, but continued to work."
      },
      {
        "sentence": "He didn't study, nor did he attend class.",
        "translation": "He didn't study or go to classes."
      }
    ]
  },
  {
    "id": "en_c2_17",
    "language": "en",
    "pattern": "Subordinating conjunctions",
    "title": "Subordinating conjunctions: although, whereas, provided, unless...",
    "shortExplanation": "although, as though, whereas, provided that, unless, given that, in case",
    "longExplanation": "Subordinating conjunctions introduce subordinate clauses.\nBy value:\n• Time: when, while, as, after, before, until, once, as soon as, whenever\n• Reasons: because, since, as, given that, seeing that\n• Conditions: if, unless, provided, as long as, in case, supposing\n• Goals: so that, in order that, best\n• Concessions: although, even though, whereas, while, however",
    "formation": "although, as though, whereas, provided that, unless, given that, in case",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "Seeing that the deadline had passed, we cancelled the meeting.",
        "translation": "Since the deadline passed, we canceled the meeting."
      },
      {
        "sentence": "Lest she forget, he sent her a reminder.",
        "translation": "So that she wouldn't forget, he sent her a reminder."
      }
    ]
  },
  {
    "id": "en_c2_18",
    "language": "en",
    "pattern": "Comma, semicolon and colon",
    "title": "Comma, semicolon and colon",
    "shortExplanation": "Use a comma before FANBOYS. Use a semicolon to link related clauses.",
    "longExplanation": "Comma:\n• Before coordinating conjunctions FANBOYS between independent clauses.\n• After introductory words/turns of phrase: However, she decided to stay.\n• In the enumerations (Oxford comma - before the last and): apples, oranges, and bananas.\nSemicolon (;): connects two independent clauses without a conjunction.\nShe was tired; she went to bed\nColon (:): introduces a list, explanation, quotation.",
    "formation": "Use a comma before FANBOYS. Use a semicolon to link related clauses.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "However, the results were inconclusive; further research is required.",
        "translation": "However, the results are mixed; further research is required."
      },
      {
        "sentence": "The company has three priorities: efficiency, innovation, and sustainability.",
        "translation": "The company has three priorities: efficiency, innovation and sustainability."
      }
    ]
  },
  {
    "id": "en_c2_19",
    "language": "en",
    "pattern": "Dash, apostrophe and quotation marks",
    "title": "Dash, apostrophe and quotation marks",
    "shortExplanation": "Em dash - for emphasis - sets off a phrase. It's vs its. \"Direct speech\"",
    "longExplanation": "Dash (—): highlights a plug-in construction (stronger than a comma): The solution - though expensive - proven effective.\nApostrophe:\n• Abbreviations: it's = it is; don't; they're\n• Possessive case: John's book; the students' results\n• \nQuotes: AmE - double (\"text\"), BrE - single ('text').",
    "formation": "Em dash - for emphasis - sets off a phrase. It's vs its. \"Direct speech\"",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "The project — launched in 2020 — exceeded all expectations.",
        "translation": "The project, launched in 2020, exceeded all expectations."
      },
      {
        "sentence": "It's important to check its settings before use.",
        "translation": "It is important to check its settings before using it."
      }
    ]
  },
  {
    "id": "en_c2_20",
    "language": "en",
    "pattern": "Special and indirect questions in academic text",
    "title": "Special and indirect questions in academic text",
    "shortExplanation": "The question is whether... / I wonder what the data shows.",
    "longExplanation": "In academic texts, direct questions are replaced by indirect ones (interrogative clauses).\nAn indirect question is a subordinate clause with the usual word order (without inversion, without do).\nIntroductory words: whether, if (yes/no), what, where, when, how, why, which.\nExample: What does this data show? → The question is what this data shows.",
    "formation": "The question is whether... / I wonder what the data shows.",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "I wonder whether the hypothesis is correct.",
        "translation": "I wonder if the hypothesis is true."
      },
      {
        "sentence": "The study examines how social media affects behaviour.",
        "translation": "The study examines how social media influences behavior."
      }
    ]
  }
];

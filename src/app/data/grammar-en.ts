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
        "sentence": "I understand you. (not: I am understanding)",
        "translation": "I understand you."
      },
      {
        "sentence": "She loves chocolate. (not: is loving)",
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
        "sentence": "Water boils at 100°C.",
        "translation": "Water boils at 100°C."
      },
      {
        "sentence": "I'm reading a great book this week.",
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
        "sentence": "I've met the new director.",
        "translation": "I met the new director."
      },
      {
        "sentence": "I met him last Tuesday.",
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
        "sentence": "If it rains tomorrow, I'll take an umbrella.",
        "translation": "If it rains tomorrow, I will take an umbrella."
      },
      {
        "sentence": "If it rained every day, I'd move to Spain.",
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
        "sentence": "I remember meeting her at a conference.",
        "translation": "I remember meeting her at a conference."
      },
      {
        "sentence": "Remember to call your mother!",
        "translation": "Don't forget to call your mom!"
      },
      {
        "sentence": "I forgot to buy milk.",
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
        "sentence": "The film that I told you about is on tonight.",
        "translation": "The movie I told you about is showing tonight."
      },
      {
        "sentence": "My sister, who lives in Paris, is visiting next week.",
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
        "sentence": "The project I'm working on is fascinating.",
        "translation": "The project I'm working on is very interesting."
      },
      {
        "sentence": "The project on which I am working is fascinating.",
        "translation": "The project on which I am working is very interesting."
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
        "sentence": "It was the noise that woke me up.",
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
        "sentence": "The film that won the Oscar was brilliant.",
        "translation": "The film that won the Oscar was great."
      },
      {
        "sentence": "Avatar, which came out in 2009, was a huge hit.",
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
        "sentence": "The report to which I referred is attached.",
        "translation": "The report I mentioned is attached."
      },
      {
        "sentence": "The report which I referred to is attached.",
        "translation": "The report I mentioned is attached."
      },
      {
        "sentence": "The report I referred to is attached.",
        "translation": "The report I mentioned is attached."
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
        "sentence": "Friends, Romans, countrymen, lend me your ears.",
        "translation": "Friends, Romans, countrymen, lend me your ears."
      },
      {
        "sentence": "The more you learn, the more you earn.",
        "translation": "The more you learn, the more you earn."
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
        "sentence": "She said the Earth moves around the Sun.",
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
  },
  {
    "id": "en_a1_25",
    "language": "en",
    "pattern": "Let's + Verb",
    "title": "Let's + Verb (Making Suggestions)",
    "shortExplanation": "Used to invite someone to do something together with you right now or soon.",
    "longExplanation": "\"Let's\" is the short form of \"Let us\". Always follow it with the base form of a verb (no \"to\", no \"-ing\"). In negative suggestions, use \"Let's not + Verb\".",
    "formation": "Let's + Base Verb (+ Object)",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "Let's take a quick break before the next lesson.",
        "translation": "Shall we take a short break before the next lesson?"
      },
      {
        "sentence": "Let's not wait any longer; the train leaves in five minutes.",
        "translation": "Let us not wait longer because the train departs in five minutes."
      }
    ]
  },
  {
    "id": "en_a1_26",
    "language": "en",
    "pattern": "How about / What about + Noun / V-ing?",
    "title": "How about / What about + Noun / V-ing?",
    "shortExplanation": "Friendly way to suggest an idea, offer an option, or check how someone feels about something.",
    "longExplanation": "In everyday conversation, both \"How about...?\" and \"What about...?\" are followed by a noun, pronoun, or an -ing verb (gerund). \"What about\" can also redirect a question back to someone (e.g. \"I'm fine, what about you?\").",
    "formation": "How about / What about + Noun / V-ing?",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "How about ordering pizza for dinner tonight?",
        "translation": "Would you like to order pizza for dinner tonight?"
      },
      {
        "sentence": "What about meeting at the café around three?",
        "translation": "Should we meet at the coffee shop around three o'clock?"
      }
    ]
  },
  {
    "id": "en_a1_27",
    "language": "en",
    "pattern": "Would like (to + Verb)",
    "title": "Would like + Noun / to + Verb (Polite Desires & Offers)",
    "shortExplanation": "Polite way to say what you want or to offer something to someone.",
    "longExplanation": "Instead of \"I want\", speakers use \"I would like\" (often contracted to \"I'd like\") to sound polite and natural in restaurants, shops, and requests. Always include \"to\" before a verb.",
    "formation": "Subject + would like + Noun / to + Base Verb",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I'd like a cup of green tea without sugar, please.",
        "translation": "Could I please have a cup of unsweetened green tea?"
      },
      {
        "sentence": "Would you like to sit near the window?",
        "translation": "Do you prefer sitting by the window?"
      }
    ]
  },
  {
    "id": "en_a1_28",
    "language": "en",
    "pattern": "Be going to + Verb",
    "title": "Be going to + Verb (Planned Future & Present Evidence)",
    "shortExplanation": "Expresses plans you have already decided on, or predictions based on signs right in front of you.",
    "longExplanation": "Conjugate \"be\" (am/is/are) to match the subject, then add \"going to\" + base verb. In fast spoken English, \"going to\" often sounds like \"gonna\".",
    "formation": "Subject + am/is/are + going to + Base Verb",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "I'm going to start a new notebook for vocabulary tomorrow.",
        "translation": "My plan is to begin a fresh vocabulary notebook tomorrow."
      },
      {
        "sentence": "Look at those dark clouds—it's going to rain soon.",
        "translation": "Those dark clouds show that rain is coming soon."
      }
    ]
  },
  {
    "id": "en_a1_29",
    "language": "en",
    "pattern": "Want to / Need to + Verb",
    "title": "Want to / Need to + Verb (Wishes & Necessities)",
    "shortExplanation": "Combines a desire (want) or necessity (need) directly with a second action using \"to\".",
    "longExplanation": "Both verbs connect to another verb through \"to + base verb\". In negative sentences, use \"don't/doesn't want to\" or \"don't/doesn't need to\". Watch out: \"want to\" often reduces to \"wanna\" in casual speech.",
    "formation": "Subject + want(s)/need(s) + to + Base Verb",
    "level": "CEFR A1",
    "examples": [
      {
        "sentence": "You need to restart the app after changing the language.",
        "translation": "Restarting the app is required once you switch languages."
      },
      {
        "sentence": "I want to improve my listening speed this year.",
        "translation": "My goal this year is to understand faster speech."
      }
    ]
  },
  {
    "id": "en_a2_27",
    "language": "en",
    "pattern": "Be able to + Verb",
    "title": "Be able to + Verb (Ability Across All Tenses)",
    "shortExplanation": "Works just like \"can\", especially in future, perfect, and infinitive forms where \"can\" is missing.",
    "longExplanation": "Because modal \"can\" only has present (can) and past (could) forms, use \"be able to\" after \"will\", \"might\", \"have been\", or \"to\". For a single difficult past achievement, \"was/were able to\" sounds more natural than \"could\".",
    "formation": "Subject + be (am/is/are/was/were/will be) + able to + Base Verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "With daily practice, you'll be able to follow native podcasts.",
        "translation": "Daily practice will give you the ability to understand native podcasts."
      },
      {
        "sentence": "Luckily, we were able to fix the bug before the demo.",
        "translation": "Fortunately, we managed to solve the bug prior to the presentation."
      }
    ]
  },
  {
    "id": "en_a2_28",
    "language": "en",
    "pattern": "Have to / Don't have to + Verb",
    "title": "Have to / Don't have to + Verb (Obligation vs. No Necessity)",
    "shortExplanation": "\"Have to\" states a rule or outside necessity; \"don't have to\" means it is optional, NOT forbidden.",
    "longExplanation": "Notice the huge difference in the negative: \"mustn't\" means it is forbidden, whereas \"don't have to\" means you are free to choose—it isn't necessary.",
    "formation": "Subject + (don't / doesn't / didn't) have to + Base Verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Do we have to memorize every single word on this list?",
        "translation": "Is memorizing every single word in the list required?"
      },
      {
        "sentence": "You don't have to pay right away; the first week is free.",
        "translation": "Immediate payment isn't required since the first week costs nothing."
      }
    ]
  },
  {
    "id": "en_a2_29",
    "language": "en",
    "pattern": "Too + adj/adv + to + Verb",
    "title": "Too + Adjective/Adverb + (for someone) + to + Verb",
    "shortExplanation": "Means something goes beyond the right limit, making an action impossible or undesirable.",
    "longExplanation": "\"Too\" has a negative result here: the suitcase is so heavy that you cannot lift it. Optionally insert \"for + person\" before \"to + Verb\" to specify who is affected.",
    "formation": "too + Adjective/Adverb + (for + Object) + to + Base Verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "The box was too heavy for me to carry upstairs alone.",
        "translation": "Because the box was excessively heavy, I couldn't bring it upstairs by myself."
      },
      {
        "sentence": "He spoke too fast for beginners to catch every phrase.",
        "translation": "His speech was too rapid for beginners to understand each phrase."
      }
    ]
  },
  {
    "id": "en_a2_30",
    "language": "en",
    "pattern": "Adj/Adv + enough + (to + Verb)",
    "title": "Adjective/Adverb + enough + (for someone) + to + Verb",
    "shortExplanation": "Means having the required degree or amount to make something possible.",
    "longExplanation": "Watch the word order! With adjectives and adverbs, \"enough\" goes AFTER the word (\"warm enough\", NOT \"enough warm\"). With nouns, \"enough\" normally goes BEFORE the noun (\"enough time\").",
    "formation": "Adjective/Adverb + enough + (for + Object) + to + Base Verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Is the audio clear enough for you to hear the tone?",
        "translation": "Can you hear the tone clearly from this audio?"
      },
      {
        "sentence": "She isn't old enough to drive on her own yet.",
        "translation": "She has not reached the legal age for solo driving yet."
      }
    ]
  },
  {
    "id": "en_a2_31",
    "language": "en",
    "pattern": "Both ... and / Either ... or / Neither ... nor",
    "title": "Correlative Conjunctions (Both...and / Either...or / Neither...nor)",
    "shortExplanation": "Pairs two equal items to include both, offer an A-or-B choice, or exclude both.",
    "longExplanation": "\"Both A and B\" always takes a plural verb. With \"either A or B\" and \"neither A nor B\", the verb agrees with B (the closer noun). Avoid double negatives after \"neither...nor\".",
    "formation": "Both A and B / Either A or B / Neither A nor B",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Either you turn in the draft today or we postpone the launch.",
        "translation": "You must submit the draft today, otherwise the launch gets delayed."
      },
      {
        "sentence": "Neither Tom nor Sarah knew the meeting had moved online.",
        "translation": "Both Tom and Sarah were unaware that the meeting switched online."
      }
    ]
  },
  {
    "id": "en_a2_32",
    "language": "en",
    "pattern": "Make / Let + Object + Base Verb",
    "title": "Make / Let + Object + Base Verb (Causative & Permission)",
    "shortExplanation": "\"Make someone do\" means causing or forcing a reaction; \"let someone do\" means allowing them.",
    "longExplanation": "Notice there is NO \"to\" before the second verb in active sentences (say \"let me explain\", NEVER \"let me to explain\"). For permission, \"allow someone to do\" requires \"to\", while \"let\" drops it.",
    "formation": "Subject + make/let + Object + Base Verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Please let me explain what happened before you decide.",
        "translation": "Allow me to explain the situation prior to making a decision."
      },
      {
        "sentence": "That sudden twist made the whole audience gasp.",
        "translation": "The unexpected twist caused everyone in the audience to gasp."
      }
    ]
  },
  {
    "id": "en_a2_33",
    "language": "en",
    "pattern": "Each other / One another",
    "title": "Each other / One another (Reciprocal Pronouns)",
    "shortExplanation": "Shows a mutual action shared back and forth between two or more people.",
    "longExplanation": "Do not confuse \"themselves\" (each acts on self) with \"each other\" (A acts on B and B acts on A). Traditionally \"each other\" fits two people and \"one another\" fits three or more, though modern speakers often interchange them.",
    "formation": "Plural Subject + Verb (+ Preposition) + each other / one another",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Good language partners always correct each other kindly.",
        "translation": "Supportive study partners give gentle corrections back and forth."
      },
      {
        "sentence": "They hadn't seen one another since university graduation.",
        "translation": "All of them had remained out of touch since graduating from college."
      }
    ]
  },
  {
    "id": "en_a2_34",
    "language": "en",
    "pattern": "As soon as + Clause",
    "title": "As soon as + Clause (Immediate Sequence)",
    "shortExplanation": "Links two events where the second happens right after the first completes.",
    "longExplanation": "Even when talking about the future, use present simple (NOT \"will\") inside the \"as soon as\" clause: \"I'll call you as soon as I land\" (NOT \"as soon as I will land\").",
    "formation": "Main Clause + as soon as + Subject + Present/Past Verb",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Text me as soon as you get back home safely.",
        "translation": "Send me a message right after arriving home safely."
      },
      {
        "sentence": "As soon as the subtitles loaded, she started shadowing.",
        "translation": "The moment the subtitles appeared, she began repeating after the speaker."
      }
    ]
  },
  {
    "id": "en_a2_35",
    "language": "en",
    "pattern": "So + adj/adv + that + Clause",
    "title": "So + Adjective/Adverb + that + Clause (Cause & Extreme Result)",
    "shortExplanation": "Shows how an intense quality leads directly to a noticeable result.",
    "longExplanation": "Compare \"so + adjective/adverb + that\" with \"such + (a/an) + noun phrase + that\". In casual speech, \"that\" is frequently dropped (\"I was so tired I fell asleep immediately\").",
    "formation": "so + Adjective/Adverb + (that) + Result Clause",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I was so exhausted that I fell asleep before the intro ended.",
        "translation": "Extreme tiredness caused me to fall asleep before the intro finished."
      },
      {
        "sentence": "He explained the idiom so clearly that everyone smiled.",
        "translation": "His explanation of the idiom was clear enough for all listeners to get it."
      }
    ]
  },
  {
    "id": "en_b1_28",
    "language": "en",
    "pattern": "Had better + Verb",
    "title": "Had better + Verb (Strong Advice & Warning)",
    "shortExplanation": "Gives urgent advice about what someone should do now, often implying trouble if they don't.",
    "longExplanation": "Even though \"had\" looks past, \"had better\" (almost always contracted to \"'d better\") refers to the present or immediate future. Negate it as \"had better not + Verb\" (never \"hadn't better\").",
    "formation": "Subject + had better ('d better) (+ not) + Base Verb",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "You'd better save a backup copy before updating the settings.",
        "translation": "It's wise to back up your copy now so nothing goes wrong during the update."
      },
      {
        "sentence": "We had better not stay out too late before tomorrow's exam.",
        "translation": "We really shouldn't stay out late tonight given tomorrow's exam."
      }
    ]
  },
  {
    "id": "en_b1_29",
    "language": "en",
    "pattern": "Would rather + Verb (than)",
    "title": "Would rather + Verb (+ than) (Personal Preference)",
    "shortExplanation": "States what you prefer to do in a specific situation rather than another option.",
    "longExplanation": "Follow \"would rather\" ('d rather) directly with a base verb (no \"to\"). Use \"than\" + base verb for the less preferred choice, or \"would rather not + Verb\" to decline politely.",
    "formation": "Subject + would rather ('d rather) (+ not) + Base Verb (+ than + Base Verb)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I'd rather watch with target-language captions than read a summary.",
        "translation": "I prefer watching videos with target-language captions over reading summaries."
      },
      {
        "sentence": "Thanks for inviting me, but I'd rather stay home tonight.",
        "translation": "I appreciate the invite, though my preference is to stay in tonight."
      }
    ]
  },
  {
    "id": "en_b1_30",
    "language": "en",
    "pattern": "Be supposed to + Verb",
    "title": "Be supposed to + Verb (Expectation, Schedule & Rules)",
    "shortExplanation": "Describes what is expected, scheduled, or considered the right rule—often hinting reality differs.",
    "longExplanation": "In present tense it conveys duty or common belief (\"this dish is supposed to be spicy\"). In past tense (\"was/were supposed to\"), it usually implies the plan didn't actually happen.",
    "formation": "Subject + be + supposed to + Base Verb",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "You're supposed to submit your summary by Friday noon.",
        "translation": "The expectation is that your summary is handed in before noon on Friday."
      },
      {
        "sentence": "Our flight was supposed to arrive an hour ago.",
        "translation": "The schedule had our flight landing an hour earlier, but it is delayed."
      }
    ]
  },
  {
    "id": "en_b1_31",
    "language": "en",
    "pattern": "Be allowed to + Verb",
    "title": "Be allowed to + Verb (Permission Across Tenses)",
    "shortExplanation": "Expresses official or social permission in any tense, including future and past.",
    "longExplanation": "Just as \"be able to\" covers all tenses for \"can\", \"be allowed to\" supplies past, future, and perfect forms for permission. Negative forms (\"aren't allowed to\") state rules clearly.",
    "formation": "Subject + be (+ not) + allowed to + Base Verb",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Visitors aren't allowed to use flash photography inside the gallery.",
        "translation": "Flash photos are prohibited for visitors in the gallery."
      },
      {
        "sentence": "Will students be allowed to bring dictionaries to the test?",
        "translation": "Are students permitted to use dictionaries during the upcoming test?"
      }
    ]
  },
  {
    "id": "en_b1_32",
    "language": "en",
    "pattern": "Be / Get used to + Noun / V-ing",
    "title": "Be used to / Get used to + Noun / V-ing (Familiarity vs. Adapting)",
    "shortExplanation": "\"Be used to\" means something already feels normal; \"get used to\" describes the process of adapting.",
    "longExplanation": "CRITICAL TRAP: Here \"to\" is a preposition, NOT an infinitive marker! Therefore it is followed by a NOUN or V-ing (\"I'm used to waking up early\"), never a base verb. Contrast with \"used to + Base Verb\" (past habit).",
    "formation": "Subject + be / get + used to + Noun / V-ing",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "It took a month, but I finally got used to hearing fast speech.",
        "translation": "After a month, rapid speech gradually started feeling normal to me."
      },
      {
        "sentence": "She's used to working under tight deadlines.",
        "translation": "Tight deadlines already feel completely normal to her."
      }
    ]
  },
  {
    "id": "en_b1_33",
    "language": "en",
    "pattern": "By the time + Clause",
    "title": "By the time + Clause (Completion Before Another Point)",
    "shortExplanation": "Shows that one event finishes or reaches a state before another moment in past or future time.",
    "longExplanation": "Pair past-reference \"by the time + Past Simple\" with Past Perfect (\"had + V3\") in the main clause. Pair future-reference \"by the time + Present Simple\" with Future Perfect (\"will have + V3\") or a future state.",
    "formation": "By the time + S1 + Verb (Present/Past), S2 + will have V3 / had V3",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "By the time we reached the theater, the opening scene had already started.",
        "translation": "The opening scene started prior to our arrival at the theater."
      },
      {
        "sentence": "I'll have reviewed all the flashcards by the time dinner is ready.",
        "translation": "Before dinner is served, my flashcard review will be complete."
      }
    ]
  },
  {
    "id": "en_b1_34",
    "language": "en",
    "pattern": "Prefer A to B / Prefer to V rather than V",
    "title": "Prefer A to B / Prefer to V rather than V (General Preferences)",
    "shortExplanation": "Expresses lasting likes and preferences between nouns, activities, or actions.",
    "longExplanation": "Use \"to\" (NOT \"than\") between two nouns or V-ing forms (\"prefer tea to coffee\", \"prefer reading to watching\"). Between two base-verb actions, use \"prefer to + V + rather than (+ V)\".",
    "formation": "prefer + Noun/V-ing + to + Noun/V-ing  |  prefer to + V + rather than + V",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I prefer listening to real podcasts to memorizing isolated word lists.",
        "translation": "I like learning through podcasts more than rote word-list study."
      },
      {
        "sentence": "She prefers to work from home rather than commute two hours a day.",
        "translation": "Working remotely suits her better than spending two hours commuting."
      }
    ]
  },
  {
    "id": "en_b1_35",
    "language": "en",
    "pattern": "Get + Object + to + Verb",
    "title": "Get + Object + to + Verb (Persuasive Causative)",
    "shortExplanation": "Means convincing, asking, or arranging for someone to do something—unlike \"make\", it requires \"to\".",
    "longExplanation": "Compare the three causatives: \"make sb do\" (force/cause, no to), \"have sb do\" (assign/request, no to), and \"get sb to do\" (persuade or manage to convince someone, WITH \"to\").",
    "formation": "Subject + get + Person + to + Base Verb",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "How did you get your brother to help with the video edit?",
        "translation": "How did you persuade your brother to assist with editing the video?"
      },
      {
        "sentence": "I finally got my pronunciation coach to slow down the playback.",
        "translation": "I managed to ask my coach to reduce the playback speed."
      }
    ]
  },
  {
    "id": "en_b2_30",
    "language": "en",
    "pattern": "Can't help + V-ing",
    "title": "Can't help + V-ing (Uncontrollable Impulse)",
    "shortExplanation": "Means you cannot stop yourself from doing or feeling something, even if you try.",
    "longExplanation": "Always follow \"can't help\" (or past \"couldn't help\") with a gerund (V-ing), never a to-infinitive. Wait—watch out for the idiom \"can't help it\" (\"I couldn't help it!\"). An alternative formal variant is \"can't help but + Base Verb\".",
    "formation": "Subject + can't / couldn't help + V-ing",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I couldn't help laughing when the cat jumped onto his keyboard.",
        "translation": "It was impossible for me to hold back my laugh when the cat hopped on his keyboard."
      },
      {
        "sentence": "She can't help noticing small grammar slips in movie subtitles.",
        "translation": "She automatically notices tiny subtitle mistakes without trying."
      }
    ]
  },
  {
    "id": "en_b2_31",
    "language": "en",
    "pattern": "It's no use / There's no point + V-ing",
    "title": "It's no use / There's no point (in) + V-ing (Futility)",
    "shortExplanation": "Says an action brings no benefit and is a waste of time or effort.",
    "longExplanation": "Both frames take a gerund (V-ing) rather than a to-infinitive. With \"There's no point\", the preposition \"in\" is optional before V-ing.",
    "formation": "It's no use + V-ing  |  There's no point (in) + V-ing",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "It's no use worrying about mistakes you already corrected.",
        "translation": "Fretting over mistakes that have already been fixed achieves nothing."
      },
      {
        "sentence": "There's no point waiting any longer—the last bus just left.",
        "translation": "Waiting further is pointless since the final bus already departed."
      }
    ]
  },
  {
    "id": "en_b2_32",
    "language": "en",
    "pattern": "Be bound to + Verb",
    "title": "Be bound to + Verb (Near Certainty)",
    "shortExplanation": "States that something is almost certain or inevitable based on how things work.",
    "longExplanation": "Speakers use \"be bound to\" when they feel confident about an outcome—either reassuring someone (\"you're bound to improve\") or warning of predictable snags (\"mistakes are bound to happen\").",
    "formation": "Subject + be + bound to + Base Verb",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "If you listen consistently every day, you're bound to improve.",
        "translation": "Daily consistent listening practically guarantees improvement."
      },
      {
        "sentence": "Small misunderstandings are bound to happen when speaking a new language.",
        "translation": "Minor misunderstandings inevitably occur when practicing a new language."
      }
    ]
  },
  {
    "id": "en_b2_33",
    "language": "en",
    "pattern": "Be about to + Verb",
    "title": "Be about to + Verb (Immediate Future)",
    "shortExplanation": "Signals an action that is only seconds or moments away from happening.",
    "longExplanation": "Do NOT add specific time expressions like \"next week\" with \"be about to\"—it is strictly for the immediate moment (often paired with \"just\"). In negative form (\"not about to\"), it can idiomatically mean refusing to do something.",
    "formation": "Subject + be (+ just) + about to + Base Verb",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Hold on—the live stream is about to start!",
        "translation": "Wait a moment because the live broadcast begins in seconds."
      },
      {
        "sentence": "I was just about to text you when you called.",
        "translation": "I was moments away from messaging you right when your call came in."
      }
    ]
  },
  {
    "id": "en_b2_34",
    "language": "en",
    "pattern": "The + comparative, the + comparative",
    "title": "The + Comparative ..., the + Comparative ... (Proportional Change)",
    "shortExplanation": "Shows that two things rise or fall together in direct proportion.",
    "longExplanation": "Place a comparative adjective/adverb (\"more\", \"sooner\", \"harder\", \"easier\") right after \"The\" in both halves. Very common in short proverbs like \"The sooner, the better\".",
    "formation": "The + Comparative (+ S + V), the + Comparative (+ S + V)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The more you read aloud, the more natural your rhythm becomes.",
        "translation": "Increased reading aloud directly improves how natural your rhythm sounds."
      },
      {
        "sentence": "The sooner we start preparing, the less stressful the deadline will feel.",
        "translation": "Starting early reduces stress as the deadline approaches."
      }
    ]
  },
  {
    "id": "en_b2_35",
    "language": "en",
    "pattern": "No matter + wh-word",
    "title": "No matter + Wh-word (Universal Concession)",
    "shortExplanation": "Means the main point remains true regardless of the situation, degree, or person.",
    "longExplanation": "Pair \"no matter\" with \"how\", \"what\", \"who\", \"where\", or \"when\". Keep present simple (NOT future \"will\") inside the clause: \"no matter what happens\" (equally interchangeable with \"whatever happens\").",
    "formation": "No matter + how/what/who/where/when (+ adj/adv) + Subject + Verb",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "No matter how busy the week gets, try to review ten cards.",
        "translation": "Even during your busiest week, aim to review ten flashcards."
      },
      {
        "sentence": "Call me right away, no matter what time it is.",
        "translation": "Feel free to phone me immediately regardless of the hour."
      }
    ]
  },
  {
    "id": "en_b2_36",
    "language": "en",
    "pattern": "Have / Get + Object + Past Participle (V3)",
    "title": "Have / Get + Object + Past Participle (Causative Passive)",
    "shortExplanation": "Used when you arrange for someone else to do a service for you, or when something unfortunate happens to you.",
    "longExplanation": "Focus on the object receiving the action (past participle V3), not who performs it (\"I had my laptop fixed\", meaning a technician fixed it). \"Get\" sounds slightly more informal than \"have\".",
    "formation": "Subject + have / get + Object + Past Participle (V3)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "I need to get my car repaired before our road trip.",
        "translation": "I must arrange for a mechanic to fix my car prior to our trip."
      },
      {
        "sentence": "She had her passport stolen at the crowded station.",
        "translation": "Her passport was unfortunately stolen while she was at the station."
      }
    ]
  },
  {
    "id": "en_c1_18",
    "language": "en",
    "pattern": "Not until ... did + S + Verb",
    "title": "Not until ... + Auxiliary Inversion (Delayed Realization)",
    "shortExplanation": "Dramatically highlights the exact moment when something finally happened after a long delay.",
    "longExplanation": "Notice WHERE inversion happens: NOT in the first \"until\" phrase/clause, ONLY in the MAIN clause! Put \"did/had/was/could\" right before the main subject.",
    "formation": "Not until + Time / Clause + did/had/aux + Subject + Verb",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Not until she replayed the clip did she notice the subtle pun.",
        "translation": "She only caught the subtle wordplay once she watched the clip again."
      },
      {
        "sentence": "Not until midnight did the street noise finally die down.",
        "translation": "The loud street noise continued all evening until midnight."
      }
    ]
  },
  {
    "id": "en_c1_19",
    "language": "en",
    "pattern": "Little did + S + know / realize",
    "title": "Little did + Subject + know / realize (Dramatic Unawareness)",
    "shortExplanation": "Narrative structure highlighting how unaware someone was of a major looming surprise.",
    "longExplanation": "Placing negative adverb \"Little\" first triggers auxiliary inversion (\"did/does + Subject + base verb\"). Frequent in storytelling, documentaries, and YouTube commentary.",
    "formation": "Little + did/does + Subject + know/realize/suspect (+ that + Clause)",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Little did he know that one ten-minute video would spark his career.",
        "translation": "He had no idea at the time that a short video would launch his career."
      },
      {
        "sentence": "Little did they realize how fast the deadline was approaching.",
        "translation": "They completely underestimated how close the deadline was."
      }
    ]
  },
  {
    "id": "en_c1_20",
    "language": "en",
    "pattern": "No sooner ... than / Hardly ... when",
    "title": "No sooner ... than / Hardly ... when (Instant Succession)",
    "shortExplanation": "Emphasizes that the second event happened almost the very second the first finished.",
    "longExplanation": "Keep the fixed pairs strictly matched: \"No sooner\" ALWAYS pairs with \"than\", while \"Hardly / Scarcely\" ALWAYS pairs with \"when\". Inverted \"had + Subject + V3\" follows the opener.",
    "formation": "No sooner had S V3 than S V2  |  Hardly had S V3 when S V2",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "No sooner had we sat down to eat than the phone rang.",
        "translation": "The phone rang the exact instant we took our seats to eat."
      },
      {
        "sentence": "Hardly had the speaker finished introducing the topic when hands went up.",
        "translation": "Questions started immediately upon finishing the topic intro."
      }
    ]
  },
  {
    "id": "en_c1_21",
    "language": "en",
    "pattern": "Were + Subject + to + Verb",
    "title": "Were + Subject + to + Verb (Inverted Hypothetical Conditional)",
    "shortExplanation": "Formal alternative to \"If + Subject + were to + Verb\" for unlikely or strategic scenarios.",
    "longExplanation": "Drop \"if\" and invert \"Were\" before the subject—ideal in business proposals, academic essays, and diplomatic discussions.",
    "formation": "Were + Subject + to + Base Verb, Subject + would/could/might + Base Verb",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "Were we to accept that offer, we would need to expand the team.",
        "translation": "If we decided to accept that offer, expanding the team would be necessary."
      },
      {
        "sentence": "Were the platform to lose offline caching, commuters would struggle.",
        "translation": "If offline caching disappeared from the platform, commuters would face issues."
      }
    ]
  },
  {
    "id": "en_c1_22",
    "language": "en",
    "pattern": "But for + Noun Phrase",
    "title": "But for + Noun Phrase (Counterfactual 'Without')",
    "shortExplanation": "Formal concise way to say \"If it hadn't been for...\" or \"Without...\".",
    "longExplanation": "Follow \"But for\" with a noun phrase, then state the imagined outcome with \"would / would have + V3\". Frequently expresses gratitude or credits a decisive factor.",
    "formation": "But for + Noun Phrase, Subject + would (have) + Verb/V3",
    "level": "CEFR C1",
    "examples": [
      {
        "sentence": "But for your quick note, I would have walked into the wrong room.",
        "translation": "If not for your quick message, I'd have entered the wrong room."
      },
      {
        "sentence": "But for steady community feedback, the project might have stalled.",
        "translation": "Without ongoing input from the community, the project could have stopped."
      }
    ]
  },
  {
    "id": "en_c2_21",
    "language": "en",
    "pattern": "Be that as it may / Suffice it to say",
    "title": "Rhetorical Concession & Summation (Be that as it may / Suffice it to say)",
    "shortExplanation": "High-register discourse frames that pivot gracefully after conceding a point or condense a complex story.",
    "longExplanation": "Use \"Be that as it may\" (= even so, regardless) to acknowledge an earlier claim while steering back to your main argument. Use \"Suffice it to say\" (= all you really need to know is...) to skip minor details and deliver the punchline.",
    "formation": "Be that as it may, + Main Clause  |  Suffice it to say, + Key Summary Clause",
    "level": "CEFR C2",
    "examples": [
      {
        "sentence": "The timeline looks aggressive; be that as it may, we have the full team ready.",
        "translation": "The schedule is tight; nevertheless, our entire team is prepared."
      },
      {
        "sentence": "Suffice it to say, nobody left that keynote feeling uninspired.",
        "translation": "To sum it up briefly, everyone walked out inspired by the keynote."
      }
    ]
  },
  {
    "id": "en_a2_36",
    "language": "en",
    "pattern": "wake up",
    "title": "wake up (Phrasal Verb)",
    "shortExplanation": "Stop sleeping, or rouse someone from sleep.",
    "longExplanation": "Separable phrasal verb when waking another person (\"wake me up\"). In everyday speech it can also mean suddenly becoming alert or aware.",
    "formation": "Subject + wake (sb) up",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "I usually wake up around seven before making coffee.",
        "translation": "I usually wake up around seven before making coffee."
      },
      {
        "sentence": "Could you wake me up if I fall asleep on the train?",
        "translation": "Could you wake me up if I fall asleep on the train?"
      }
    ]
  },
  {
    "id": "en_a2_37",
    "language": "en",
    "pattern": "go back",
    "title": "go back (Phrasal Verb)",
    "shortExplanation": "Return to an earlier place, time, or previous point in a discussion.",
    "longExplanation": "Often takes \"to\" before a destination or earlier topic. In idiomatic speech, \"We go back years\" means we have known each other for years.",
    "formation": "Subject + go back (+ to + Place/Topic)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Let's go back to the previous slide for a moment.",
        "translation": "Let's go back to the previous slide for a moment."
      },
      {
        "sentence": "She plans to go back to her hometown next month.",
        "translation": "She plans to go back to her hometown next month."
      }
    ]
  },
  {
    "id": "en_a2_38",
    "language": "en",
    "pattern": "go out",
    "title": "go out (Phrasal Verb)",
    "shortExplanation": "Leave home for social fun, stop burning/shining, or date someone.",
    "longExplanation": "A top everyday verb: going out with friends for dinner, lights going out in a storm, or trends going out of fashion.",
    "formation": "Subject + go out (+ with + Person)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Do you want to go out for noodles after class?",
        "translation": "Do you want to go out for noodles after class?"
      },
      {
        "sentence": "All the street lights suddenly went out during the storm.",
        "translation": "All the street lights suddenly went out during the storm."
      }
    ]
  },
  {
    "id": "en_a2_39",
    "language": "en",
    "pattern": "come on",
    "title": "come on (Phrasal Verb)",
    "shortExplanation": "Encourage someone (\"Hurry up / Try it!\"), express disbelief (\"Seriously?\"), or start operating.",
    "longExplanation": "One of the most frequent spoken fillers in movies and vlogs—listen to the speaker's tone to tell encouragement from playful disbelief.",
    "formation": "Come on! / Subject + come on",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Come on, we're going to miss the opening trailer!",
        "translation": "Come on, we're going to miss the opening trailer!"
      },
      {
        "sentence": "Oh come on, you don't really believe that rumor, do you?",
        "translation": "Oh come on, you don't really believe that rumor, do you?"
      }
    ]
  },
  {
    "id": "en_a2_40",
    "language": "en",
    "pattern": "look after",
    "title": "look after (Phrasal Verb)",
    "shortExplanation": "Take care of a person, pet, plant, or keep something in good condition.",
    "longExplanation": "Inseparable phrasal verb: the object always stays AFTER \"after\" (\"look after him\", never \"look him after\"). Synonym of \"take care of\".",
    "formation": "Subject + look after + Noun/Person",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Can you look after my plants while I travel this week?",
        "translation": "Can you look after my plants while I travel this week?"
      },
      {
        "sentence": "Remember to look after your eyes when studying late.",
        "translation": "Remember to look after your eyes when studying late."
      }
    ]
  },
  {
    "id": "en_a2_41",
    "language": "en",
    "pattern": "look up",
    "title": "look up (Phrasal Verb)",
    "shortExplanation": "Search for a word or fact in a dictionary/online, or gradually improve (\"things are looking up\").",
    "longExplanation": "Separable when looking up information (\"look it up in the dictionary\"). Intransitive when meaning \"improve\".",
    "formation": "Subject + look up + Info  |  look + Info + up",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Just tap any subtitle word to look up its meaning right away.",
        "translation": "Just tap any subtitle word to look up its meaning right away."
      },
      {
        "sentence": "After a rough winter, sales are finally looking up.",
        "translation": "After a rough winter, sales are finally looking up."
      }
    ]
  },
  {
    "id": "en_a2_42",
    "language": "en",
    "pattern": "put on",
    "title": "put on (Phrasal Verb)",
    "shortExplanation": "Wear clothes/accessories, turn on equipment, gain weight, or stage a performance.",
    "longExplanation": "Separable verb with pronouns inside (\"put it on\"). Opposite of \"take off\" for clothing and glasses.",
    "formation": "Subject + put on + Noun / Weight / Show",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Put on your headphones so you can catch every consonant.",
        "translation": "Put on your headphones so you can catch every consonant."
      },
      {
        "sentence": "Don't worry about putting on a bit of weight over the holidays.",
        "translation": "Don't worry about putting on a bit of weight over the holidays."
      }
    ]
  },
  {
    "id": "en_a2_43",
    "language": "en",
    "pattern": "take off",
    "title": "take off (Phrasal Verb)",
    "shortExplanation": "Remove clothes/shoes, leave the ground (airplane), quickly become successful, or take time away from work.",
    "longExplanation": "Both separable (\"take your jacket off\") and intransitive (\"the plane took off\"). Notice how business/channel growth uses \"take off\" (= soar).",
    "formation": "Subject + take off (+ Noun)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Please take off your wet shoes near the doorway.",
        "translation": "Please take off your wet shoes near the doorway."
      },
      {
        "sentence": "Her cooking channel really took off after that short clip went viral.",
        "translation": "Her cooking channel really took off after that short clip went viral."
      }
    ]
  },
  {
    "id": "en_a2_44",
    "language": "en",
    "pattern": "turn on",
    "title": "turn on (Phrasal Verb)",
    "shortExplanation": "Switch a machine, light, or subtitle feature on so it starts working.",
    "longExplanation": "Opposite of \"turn off\". Remember pronoun placement: always \"turn it on\", NEVER \"turn on it\" (unless meaning \"attack suddenly\").",
    "formation": "Subject + turn on + Device / turn + Device + on",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Turn on dual subtitles if a dialogue moves too quickly.",
        "translation": "Turn on dual subtitles if a dialogue moves too quickly."
      },
      {
        "sentence": "Could you turn on the desk lamp? It's getting dark.",
        "translation": "Could you turn on the desk lamp? It's getting dark."
      }
    ]
  },
  {
    "id": "en_a2_45",
    "language": "en",
    "pattern": "write down",
    "title": "write down (Phrasal Verb)",
    "shortExplanation": "Record words, numbers, or ideas on paper (or in notes) so you do not forget them.",
    "longExplanation": "Separable with object or pronoun inside (\"write them down\"). Slightly more concrete than just \"note\".",
    "formation": "Subject + write down + Noun / write + Noun + down",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "Write down two fresh phrases you hear in every video.",
        "translation": "Write down two fresh phrases you hear in every video."
      },
      {
        "sentence": "Hold on, let me grab a pen and write your address down.",
        "translation": "Hold on, let me grab a pen and write your address down."
      }
    ]
  },
  {
    "id": "en_a2_46",
    "language": "en",
    "pattern": "pick up",
    "title": "pick up (Phrasal Verb)",
    "shortExplanation": "Lift something up, collect someone by car, learn naturally without formal study, or speed up.",
    "longExplanation": "One of English's highest-utility verbs! Separable when lifting/collecting (\"pick me up at six\") and great for language learning (\"pick up slang naturally\").",
    "formation": "Subject + pick up + Noun / Speed / Skill",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "You can pick up natural rhythm just by listening to real conversations.",
        "translation": "You can pick up natural rhythm just by listening to real conversations."
      },
      {
        "sentence": "I'll pick you up outside the station at seven.",
        "translation": "I'll pick you up outside the station at seven."
      }
    ]
  },
  {
    "id": "en_a2_47",
    "language": "en",
    "pattern": "grow up",
    "title": "grow up (Phrasal Verb)",
    "shortExplanation": "Gradually change from a child into an adult, or become more mature in behavior.",
    "longExplanation": "Intransitive: NEVER use an object after \"grow up\"! Compare \"grow up\" (person becoming an adult) with \"bring up\" (parent raising a child).",
    "formation": "Subject + grow up",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "She grew up speaking both Vietnamese and English at home.",
        "translation": "She grew up speaking both Vietnamese and English at home."
      },
      {
        "sentence": "It's time to grow up and take responsibility for your choices.",
        "translation": "It's time to grow up and take responsibility for your choices."
      }
    ]
  },
  {
    "id": "en_b1_36",
    "language": "en",
    "pattern": "find out",
    "title": "find out (Phrasal Verb)",
    "shortExplanation": "Discover a hidden or previously unknown fact after checking, reading, or asking.",
    "longExplanation": "Contrast with \"find\" (finding lost keys vs discovering information). Often opens \"that / what / how / if\" clauses.",
    "formation": "Subject + find out (+ about + Noun / Clause)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Watch until the end to find out what caused the glitch.",
        "translation": "Watch until the end to find out what caused the glitch."
      },
      {
        "sentence": "Did you ever find out who left that anonymous comment?",
        "translation": "Did you ever find out who left that anonymous comment?"
      }
    ]
  },
  {
    "id": "en_b1_37",
    "language": "en",
    "pattern": "give up",
    "title": "give up (Phrasal Verb)",
    "shortExplanation": "Stop trying to do something difficult, or quit a regular habit.",
    "longExplanation": "CRITICAL GRAMMAR: Always follow \"give up\" with a NOUN or V-ing (gerund)—never a to-infinitive (\"give up smoking\", NEVER \"give up to smoke\").",
    "formation": "Subject + give up (+ Noun / V-ing)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Don't give up just because the first few scenes feel fast.",
        "translation": "Don't give up just because the first few scenes feel fast."
      },
      {
        "sentence": "He gave up sugary drinks completely three months ago.",
        "translation": "He gave up sugary drinks completely three months ago."
      }
    ]
  },
  {
    "id": "en_b1_38",
    "language": "en",
    "pattern": "go on",
    "title": "go on (Phrasal Verb)",
    "shortExplanation": "Continue doing something, happen (\"What's going on?\"), or move on to the next stage.",
    "longExplanation": "Distinguish \"go on V-ing\" (continue the SAME task) vs \"go on to + Verb\" (finish step A and shift to step B).",
    "formation": "Subject + go on (+ V-ing / to + Verb)",
    "level": "CEFR A2",
    "examples": [
      {
        "sentence": "What's going on in the courtyard right now?",
        "translation": "What's going on in the courtyard right now?"
      },
      {
        "sentence": "Wait—don't stop, go on explaining your main idea!",
        "translation": "Wait—don't stop, go on explaining your main idea!"
      }
    ]
  },
  {
    "id": "en_b1_39",
    "language": "en",
    "pattern": "hold on",
    "title": "hold on (Phrasal Verb)",
    "shortExplanation": "Wait briefly (especially on phone/video calls), grip tightly, or stay strong.",
    "longExplanation": "Used nonstop in everyday English when pausing someone gently (\"Hold on a sec\") or clutching something (\"Hold on to the handrail\").",
    "formation": "Hold on (+ a second) / Subject + hold on (+ to + Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Hold on a second—let me turn the captions back on.",
        "translation": "Hold on a second—let me turn the captions back on."
      },
      {
        "sentence": "Hold on to your ticket until you exit the station.",
        "translation": "Hold on to your ticket until you exit the station."
      }
    ]
  },
  {
    "id": "en_b1_40",
    "language": "en",
    "pattern": "keep on",
    "title": "keep on (Phrasal Verb)",
    "shortExplanation": "Continue doing something stubbornly, repeatedly, or despite obstacles.",
    "longExplanation": "Always takes V-ing directly after \"keep on\". Adds a stronger feeling of persistence or repetition than plain \"keep\".",
    "formation": "Subject + keep on + V-ing",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Keep on shadowing short clips and your accent will loosen up.",
        "translation": "Keep on shadowing short clips and your accent will loosen up."
      },
      {
        "sentence": "Why does my phone keep on disconnecting from Bluetooth?",
        "translation": "Why does my phone keep on disconnecting from Bluetooth?"
      }
    ]
  },
  {
    "id": "en_b1_41",
    "language": "en",
    "pattern": "keep up",
    "title": "keep up (Phrasal Verb)",
    "shortExplanation": "Stay at the same speed/level as someone, maintain good habits, or continue good work.",
    "longExplanation": "Add \"with\" before a person, trend, or schedule (\"keep up with rapid speech\"). Alone as encouragement: \"Keep it up!\"",
    "formation": "Subject + keep up (+ with + Noun/Person)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Even native speakers sometimes pause to keep up with rapid jokes.",
        "translation": "Even native speakers sometimes pause to keep up with rapid jokes."
      },
      {
        "sentence": "Your streak hits thirty days tomorrow—keep it up!",
        "translation": "Your streak hits thirty days tomorrow—keep it up!"
      }
    ]
  },
  {
    "id": "en_b1_42",
    "language": "en",
    "pattern": "break down",
    "title": "break down (Phrasal Verb)",
    "shortExplanation": "Stop working (vehicle/machine), lose emotional control, or split complex info into smaller parts.",
    "longExplanation": "Both intransitive (\"the car broke down\") and separable transitive (\"let's break the sentence down chunk by chunk\").",
    "formation": "Subject + break down (+ Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Our bus broke down halfway up the mountain pass.",
        "translation": "Our bus broke down halfway up the mountain pass."
      },
      {
        "sentence": "Let's break this long sentence down into three manageable chunks.",
        "translation": "Let's break this long sentence down into three manageable chunks."
      }
    ]
  },
  {
    "id": "en_b1_43",
    "language": "en",
    "pattern": "bring up",
    "title": "bring up (Phrasal Verb)",
    "shortExplanation": "Mention a subject in conversation, or raise and educate a child.",
    "longExplanation": "Separable: \"Don't bring it up right now.\" Watch how context separates \"mention a topic\" from \"raise children\".",
    "formation": "Subject + bring up + Topic/Child",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Why did she bring up that old argument during lunch?",
        "translation": "Why did she bring up that old argument during lunch?"
      },
      {
        "sentence": "My grandparents brought me up in a small coastal town.",
        "translation": "My grandparents brought me up in a small coastal town."
      }
    ]
  },
  {
    "id": "en_b1_44",
    "language": "en",
    "pattern": "carry on",
    "title": "carry on (Phrasal Verb)",
    "shortExplanation": "Keep doing something after an interruption, or behave excitedly/noisily (British informal).",
    "longExplanation": "Frequently used with V-ing (\"carry on talking\") or \"with\" (\"carry on with your plan\"). Common across both British and global English.",
    "formation": "Subject + carry on (+ V-ing / with + Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Sorry for interrupting—please carry on with your story.",
        "translation": "Sorry for interrupting—please carry on with your story."
      },
      {
        "sentence": "After sipping some water, the host carried on answering questions.",
        "translation": "After sipping some water, the host carried on answering questions."
      }
    ]
  },
  {
    "id": "en_b1_45",
    "language": "en",
    "pattern": "carry out",
    "title": "carry out (Phrasal Verb)",
    "shortExplanation": "Actually perform and complete a planned task, experiment, promise, or instruction.",
    "longExplanation": "Separable with formal nouns like \"research\", \"survey\", \"test\", \"orders\", \"plan\". Much more natural in academic/work speech than \"do a research\".",
    "formation": "Subject + carry out + Plan/Task/Study",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Researchers carried out a large study on subtitle reading habits.",
        "translation": "Researchers carried out a large study on subtitle reading habits."
      },
      {
        "sentence": "The team carefully carried out every step of the checklist.",
        "translation": "The team carefully carried out every step of the checklist."
      }
    ]
  },
  {
    "id": "en_b1_46",
    "language": "en",
    "pattern": "catch up",
    "title": "catch up (Phrasal Verb)",
    "shortExplanation": "Reach the same level after falling behind, or chat with a friend to share recent news.",
    "longExplanation": "Pair with \"with\" before a person or backlog (\"catch up with work\") and \"on\" before missed tasks (\"catch up on sleep / episodes\").",
    "formation": "Subject + catch up (+ with + Person/Work)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Let's grab coffee soon and catch up properly!",
        "translation": "Let's grab coffee soon and catch up properly!"
      },
      {
        "sentence": "I spent Sunday afternoon catching up on unread emails.",
        "translation": "I spent Sunday afternoon catching up on unread emails."
      }
    ]
  },
  {
    "id": "en_b1_47",
    "language": "en",
    "pattern": "come across",
    "title": "come across (Phrasal Verb)",
    "shortExplanation": "Find someone or something unexpectedly by chance, or create a certain impression on others.",
    "longExplanation": "Inseparable: always \"come across a great phrase\" (never \"come a phrase across\"). Meaning 2 uses adjectives/\"as\": \"He comes across as friendly.\"",
    "formation": "Subject + come across + Noun / Adjective",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I came across a great idiom while watching a travel vlog.",
        "translation": "I came across a great idiom while watching a travel vlog."
      },
      {
        "sentence": "She comes across as very calm even under live pressure.",
        "translation": "She comes across as very calm even under live pressure."
      }
    ]
  },
  {
    "id": "en_b1_48",
    "language": "en",
    "pattern": "come up",
    "title": "come up (Phrasal Verb)",
    "shortExplanation": "Arise unexpectedly (problem/opportunity), get mentioned in talk, or approach (\"coming up next\").",
    "longExplanation": "Add \"with\" when inventing an idea or solution (\"come up with a plan\"). Without \"with\", it means arise/happen.",
    "formation": "Subject + come up (+ with + Idea)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Something urgent came up at work, so I have to leave early.",
        "translation": "Something urgent came up at work, so I have to leave early."
      },
      {
        "sentence": "Can you come up with two example sentences using this phrase?",
        "translation": "Can you come up with two example sentences using this phrase?"
      }
    ]
  },
  {
    "id": "en_b1_49",
    "language": "en",
    "pattern": "count on",
    "title": "count on (Phrasal Verb)",
    "shortExplanation": "Trust and rely completely on someone or something to support you or happen.",
    "longExplanation": "Inseparable. Same meaning as \"rely on\", slightly warmer and more conversational.",
    "formation": "Subject + count on + Noun / V-ing",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "You can always count on me if you get stuck on a tricky line.",
        "translation": "You can always count on me if you get stuck on a tricky line."
      },
      {
        "sentence": "Don't count on perfect weather for an outdoor picnic in April.",
        "translation": "Don't count on perfect weather for an outdoor picnic in April."
      }
    ]
  },
  {
    "id": "en_b1_50",
    "language": "en",
    "pattern": "cut down",
    "title": "cut down (Phrasal Verb)",
    "shortExplanation": "Reduce the amount, frequency, or cost of something (such as sugar, screen time, expenses).",
    "longExplanation": "Add \"on\" before the item being reduced when intransitive (\"cut down on caffeine\"), or omit \"on\" when direct object (\"cut expenses down\").",
    "formation": "Subject + cut down (+ on + Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I'm trying to cut down on late-night scrolling before bed.",
        "translation": "I'm trying to cut down on late-night scrolling before bed."
      },
      {
        "sentence": "Turning off autoplay helps cut down wasted screen time.",
        "translation": "Turning off autoplay helps cut down wasted screen time."
      }
    ]
  },
  {
    "id": "en_b1_51",
    "language": "en",
    "pattern": "cut off",
    "title": "cut off (Phrasal Verb)",
    "shortExplanation": "Interrupt someone speaking, disconnect power/supply, or isolate a place/person.",
    "longExplanation": "Separable: \"Don't cut me off mid-sentence!\" Also common passively: \"The town was cut off by floods.\"",
    "formation": "Subject + cut off + Noun / cut + Noun + off",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Sorry, my mic cut off for five seconds—did you hear that?",
        "translation": "Sorry, my mic cut off for five seconds—did you hear that?"
      },
      {
        "sentence": "Please don't cut her off before she finishes her thought.",
        "translation": "Please don't cut her off before she finishes her thought."
      }
    ]
  },
  {
    "id": "en_b1_52",
    "language": "en",
    "pattern": "deal with",
    "title": "deal with (Phrasal Verb)",
    "shortExplanation": "Handle a problem, talk/work with a client, or be about a topic (article/video).",
    "longExplanation": "Inseparable. Works cleanly both for practical problem-solving (\"deal with stress\") and describing content (\"this chapter deals with tone\").",
    "formation": "Subject + deal with + Noun",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "How do you deal with burnout when studying every day?",
        "translation": "How do you deal with burnout when studying every day?"
      },
      {
        "sentence": "The second half of the episode deals with polite apologies.",
        "translation": "The second half of the episode deals with polite apologies."
      }
    ]
  },
  {
    "id": "en_b1_53",
    "language": "en",
    "pattern": "end up",
    "title": "end up (Phrasal Verb)",
    "shortExplanation": "Finally reach an unexpected outcome, situation, or destination after a chain of events.",
    "longExplanation": "Never put a to-infinitive after \"end up\"! Follow it with V-ing, a place phrase, \"with + noun\", or an adjective.",
    "formation": "Subject + end up + V-ing / Place / Adjective",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "We missed our stop and ended up walking twenty minutes home.",
        "translation": "We missed our stop and ended up walking twenty minutes home."
      },
      {
        "sentence": "He only meant to watch one clip, yet ended up studying for an hour.",
        "translation": "He only meant to watch one clip, yet ended up studying for an hour."
      }
    ]
  },
  {
    "id": "en_b1_54",
    "language": "en",
    "pattern": "figure out",
    "title": "figure out (Phrasal Verb)",
    "shortExplanation": "Understand or solve something tricky after thinking about it carefully.",
    "longExplanation": "Separable (\"figure it out\"). Much more natural in everyday American and global English than \"comprehend\".",
    "formation": "Subject + figure out + Noun/Clause / figure + Noun + out",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Give me five minutes—I'll figure out why the audio isn't syncing.",
        "translation": "Give me five minutes—I'll figure out why the audio isn't syncing."
      },
      {
        "sentence": "Did you finally figure out what that idiom meant in context?",
        "translation": "Did you finally figure out what that idiom meant in context?"
      }
    ]
  },
  {
    "id": "en_b1_55",
    "language": "en",
    "pattern": "fit in",
    "title": "fit in (Phrasal Verb)",
    "shortExplanation": "Feel accepted as part of a group, or find space/time in a tight schedule.",
    "longExplanation": "Also separable when making room for something (\"Can we fit one quick review session in?\").",
    "formation": "Subject + fit in (+ with + Group/Schedule)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Even ten focused minutes can fit in easily during a lunch break.",
        "translation": "Even ten focused minutes can fit in easily during a lunch break."
      },
      {
        "sentence": "She quickly fit in with the new teammates at work.",
        "translation": "She quickly fit in with the new teammates at work."
      }
    ]
  },
  {
    "id": "en_b1_56",
    "language": "en",
    "pattern": "follow up",
    "title": "follow up (Phrasal Verb)",
    "shortExplanation": "Take a second step later to check progress, confirm details, or investigate further.",
    "longExplanation": "Note noun/adj counterpart \"a follow-up email\" (hyphenated) vs two-word phrasal verb \"follow up on it\".",
    "formation": "Subject + follow up (+ on + Noun / with + Person)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I'll follow up tomorrow morning if the team hasn't replied.",
        "translation": "I'll follow up tomorrow morning if the team hasn't replied."
      },
      {
        "sentence": "She followed up the lecture with five practical drills.",
        "translation": "She followed up the lecture with five practical drills."
      }
    ]
  },
  {
    "id": "en_b1_57",
    "language": "en",
    "pattern": "get away",
    "title": "get away (Phrasal Verb)",
    "shortExplanation": "Escape from somewhere, take a short holiday, or avoid punishment (\"get away with\").",
    "longExplanation": "Notice the three-word upgrade \"get away with + something\" (= do something wrong and escape blame).",
    "formation": "Subject + get away (+ from + Place / with + Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "We're hoping to get away to the coast for a quiet weekend.",
        "translation": "We're hoping to get away to the coast for a quiet weekend."
      },
      {
        "sentence": "You won't get away with skipping your reviews forever!",
        "translation": "You won't get away with skipping your reviews forever!"
      }
    ]
  },
  {
    "id": "en_b1_58",
    "language": "en",
    "pattern": "get back",
    "title": "get back (Phrasal Verb)",
    "shortExplanation": "Return home/to a place, reply to someone later (\"get back to you\"), or recover something lost.",
    "longExplanation": "\"I'll get back to you\" is one of the most polite, natural phrases in English messages and calls (= I'll check and reply).",
    "formation": "Subject + get back (+ to + Place/Person)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Let me double-check the schedule and get back to you tonight.",
        "translation": "Let me double-check the schedule and get back to you tonight."
      },
      {
        "sentence": "What time did you finally get back home last night?",
        "translation": "What time did you finally get back home last night?"
      }
    ]
  },
  {
    "id": "en_b1_59",
    "language": "en",
    "pattern": "get over",
    "title": "get over (Phrasal Verb)",
    "shortExplanation": "Recover emotionally or physically from an illness, breakup, disappointment, or shock.",
    "longExplanation": "Inseparable: always \"get over it / the flu / the shock\". Also heard as disbelief: \"I can't get over how clear that was!\"",
    "formation": "Subject + get over + Illness/Setback/Surprise",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "It took him two weeks to get over a stubborn summer cold.",
        "translation": "It took him two weeks to get over a stubborn summer cold."
      },
      {
        "sentence": "I still can't get over how much your pronunciation improved!",
        "translation": "I still can't get over how much your pronunciation improved!"
      }
    ]
  },
  {
    "id": "en_b1_60",
    "language": "en",
    "pattern": "get through",
    "title": "get through (Phrasal Verb)",
    "shortExplanation": "Finish a tough task/period, make phone contact, or make someone truly understand you (\"get through to\").",
    "longExplanation": "Great flexibility: \"get through a tough chapter\", \"get through to customer support\", or \"get through to someone emotionally\".",
    "formation": "Subject + get through (+ to + Person / Exam/Task)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Listening to short podcasts helped me get through long commutes.",
        "translation": "Listening to short podcasts helped me get through long commutes."
      },
      {
        "sentence": "I tried calling twice, but couldn't get through to the front desk.",
        "translation": "I tried calling twice, but couldn't get through to the front desk."
      }
    ]
  },
  {
    "id": "en_b1_61",
    "language": "en",
    "pattern": "hand in",
    "title": "hand in (Phrasal Verb)",
    "shortExplanation": "Submit completed homework, an application, a form, or a resignation notice to an authority.",
    "longExplanation": "Separable: \"hand your essay in before five\". Synonym of \"turn in\" or \"submit\".",
    "formation": "Subject + hand in + Homework/Report/Resignation",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Make sure you hand in your assignment before Friday midnight.",
        "translation": "Make sure you hand in your assignment before Friday midnight."
      },
      {
        "sentence": "He decided to hand in his notice after finding a remote role.",
        "translation": "He decided to hand in his notice after finding a remote role."
      }
    ]
  },
  {
    "id": "en_b1_62",
    "language": "en",
    "pattern": "hang on",
    "title": "hang on (Phrasal Verb)",
    "shortExplanation": "Casual spoken way to ask someone to pause/wait briefly, or cling tightly to something.",
    "longExplanation": "Friendly, informal twin of \"hold on\". Often starts spontaneous reactions: \"Hang on—what did she just say?\"",
    "formation": "Hang on (+ to + Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Hang on, let me replay that line at slower speed!",
        "translation": "Hang on, let me replay that line at slower speed!"
      },
      {
        "sentence": "Hang on tight while the boat crosses those bigger waves.",
        "translation": "Hang on tight while the boat crosses those bigger waves."
      }
    ]
  },
  {
    "id": "en_b1_63",
    "language": "en",
    "pattern": "look back",
    "title": "look back (Phrasal Verb)",
    "shortExplanation": "Think back about memories, experiences, or lessons from the past.",
    "longExplanation": "When mentioning the specific memory, add \"on\" (or \"at\"): \"Looking back on my first trip...\".",
    "formation": "Subject + look back (+ on + Past Event)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "You'll look back on these early study sessions and smile.",
        "translation": "You'll look back on these early study sessions and smile."
      },
      {
        "sentence": "Looking back, skipping breaks actually slowed my progress down.",
        "translation": "Looking back, skipping breaks actually slowed my progress down."
      }
    ]
  },
  {
    "id": "en_b1_64",
    "language": "en",
    "pattern": "make up",
    "title": "make up (Phrasal Verb)",
    "shortExplanation": "Invent an excuse/story, reconcile after an argument, form part of a whole, or compensate for missed work.",
    "longExplanation": "Four high-value senses: \"make up a story\" (invent), \"make up with a friend\" (forgive), \"make up 30%\" (constitute), and \"make up for lost time\" (compensate).",
    "formation": "Subject + make up (+ Story/Mind/Group)  |  make up with",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Please don't make up an excuse—just tell me what happened.",
        "translation": "Please don't make up an excuse—just tell me what happened."
      },
      {
        "sentence": "Listening makes up nearly half of my daily study routine.",
        "translation": "Listening makes up nearly half of my daily study routine."
      }
    ]
  },
  {
    "id": "en_b1_65",
    "language": "en",
    "pattern": "move on",
    "title": "move on (Phrasal Verb)",
    "shortExplanation": "Leave a finished topic/phase behind and advance to the next one, or recover emotionally.",
    "longExplanation": "Teachers, podcast hosts, and creators say \"Let's move on to...\" constantly as a clean section transition.",
    "formation": "Subject + move on (+ to + Next Topic)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Once you master these vowels, we'll move on to natural rhythm.",
        "translation": "Once you master these vowels, we'll move on to natural rhythm."
      },
      {
        "sentence": "It hurts at first, yet eventually everyone has to move on.",
        "translation": "It hurts at first, yet eventually everyone has to move on."
      }
    ]
  },
  {
    "id": "en_b1_66",
    "language": "en",
    "pattern": "open up",
    "title": "open up (Phrasal Verb)",
    "shortExplanation": "Speak honestly about private feelings, unlock a new opportunity, or physically unlock a door/shop.",
    "longExplanation": "Can be intransitive (\"He finally opened up about his worries\") or separable (\"Reading opened up new worlds\").",
    "formation": "Subject + open up (+ about + Topic)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Learning another language opens up friendships you never imagined.",
        "translation": "Learning another language opens up friendships you never imagined."
      },
      {
        "sentence": "He rarely opens up about his childhood even to close friends.",
        "translation": "He rarely opens up about his childhood even to close friends."
      }
    ]
  },
  {
    "id": "en_b1_67",
    "language": "en",
    "pattern": "point out",
    "title": "point out (Phrasal Verb)",
    "shortExplanation": "Draw attention to an important fact, detail, or mistake someone might have missed.",
    "longExplanation": "Separable with short noun objects (\"point that out\"), and keeps \"point out\" together before a longer \"that\" clause.",
    "formation": "Subject + point out + Noun / that-Clause",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Thanks for pointing out that subtle typo in the caption.",
        "translation": "Thanks for pointing out that subtle typo in the caption."
      },
      {
        "sentence": "Experts point out that short daily review beats weekend cramming.",
        "translation": "Experts point out that short daily review beats weekend cramming."
      }
    ]
  },
  {
    "id": "en_b1_68",
    "language": "en",
    "pattern": "put off",
    "title": "put off (Phrasal Verb)",
    "shortExplanation": "Delay or postpone an event/task to a later time, or make someone lose interest/enthusiasm.",
    "longExplanation": "GRAMMAR RULE: Always follow \"put off\" with a NOUN or V-ing (\"put off replying\"), NEVER \"to + Verb\"!",
    "formation": "Subject + put off + Noun / V-ing",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Stop putting off that tricky grammar lesson—start with five minutes.",
        "translation": "Stop putting off that tricky grammar lesson—start with five minutes."
      },
      {
        "sentence": "Don't let long words put you off watching native documentaries.",
        "translation": "Don't let long words put you off watching native documentaries."
      }
    ]
  },
  {
    "id": "en_b1_69",
    "language": "en",
    "pattern": "run into",
    "title": "run into (Phrasal Verb)",
    "shortExplanation": "Meet a friend completely by surprise, or unexpectedly face a problem or obstacle.",
    "longExplanation": "Inseparable. Twin everyday contexts: bumping into a colleague on the street, or running into an unexpected bug/trouble.",
    "formation": "Subject + run into + Person/Problem",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "I ran into my former teacher at the neighborhood bookstore.",
        "translation": "I ran into my former teacher at the neighborhood bookstore."
      },
      {
        "sentence": "Let me know if you run into any trouble downloading the offline pack.",
        "translation": "Let me know if you run into any trouble downloading the offline pack."
      }
    ]
  },
  {
    "id": "en_b1_70",
    "language": "en",
    "pattern": "run out",
    "title": "run out (Phrasal Verb)",
    "shortExplanation": "Use up all of something so none remains, or expire (time/ticket/patience).",
    "longExplanation": "Use \"of\" when naming what is finished (\"We ran out of coffee\"), and no \"of\" when the resource itself is the subject (\"Time is running out\").",
    "formation": "Subject + run out (+ of + Resource)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "We're running out of time—let's summarize the last rule.",
        "translation": "We're running out of time—let's summarize the last rule."
      },
      {
        "sentence": "My notebook ran out of blank pages halfway through the season.",
        "translation": "My notebook ran out of blank pages halfway through the season."
      }
    ]
  },
  {
    "id": "en_b1_71",
    "language": "en",
    "pattern": "work out",
    "title": "work out (Phrasal Verb)",
    "shortExplanation": "Exercise physically, find an answer/calculation, or end successfully (\"everything worked out\").",
    "longExplanation": "Super versatile: exercise at the gym, solve a budget/puzzle, or turn out well in the end.",
    "formation": "Subject + work out (+ Noun)",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Even a twenty-minute walk counts as working out after work.",
        "translation": "Even a twenty-minute walk counts as working out after work."
      },
      {
        "sentence": "It looked stressful at first, yet everything worked out nicely.",
        "translation": "It looked stressful at first, yet everything worked out nicely."
      }
    ]
  },
  {
    "id": "en_b1_72",
    "language": "en",
    "pattern": "sort out",
    "title": "sort out (Phrasal Verb)",
    "shortExplanation": "Organize messy items into order, or fix a misunderstanding/logistics issue.",
    "longExplanation": "Separable (\"sort it out\"). Very frequent in British and Australian English as well as everyday global usage.",
    "formation": "Subject + sort out + Mess/Problem",
    "level": "CEFR B1",
    "examples": [
      {
        "sentence": "Let's sort out the Wi-Fi issue before the call begins.",
        "translation": "Let's sort out the Wi-Fi issue before the call begins."
      },
      {
        "sentence": "She sorted out her vocabulary tags by difficulty level.",
        "translation": "She sorted out her vocabulary tags by difficulty level."
      }
    ]
  },
  {
    "id": "en_b2_37",
    "language": "en",
    "pattern": "account for",
    "title": "account for (Phrasal Verb)",
    "shortExplanation": "Explain the reason behind something, or form a specific proportion of a total.",
    "longExplanation": "Inseparable. Very common in news, data analysis, and documentaries (\"exports account for 40%\" or \"how do you account for this shift?\").",
    "formation": "Subject + account for + Noun",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Video clips account for over seventy percent of mobile traffic.",
        "translation": "Over seventy percent of mobile traffic comes from video clips."
      },
      {
        "sentence": "How do you account for this sudden jump in test scores?",
        "translation": "What explanation do you have for this abrupt improvement in scores?"
      }
    ]
  },
  {
    "id": "en_b2_38",
    "language": "en",
    "pattern": "add up",
    "title": "add up (Phrasal Verb)",
    "shortExplanation": "Gradually reach a large total, calculate a sum, or make logical sense together (\"something doesn't add up\").",
    "longExplanation": "When meaning \"make sense\", \"add up\" is almost always negative or in a question (\"His story just doesn't add up\").",
    "formation": "Subject + add up (+ Noun)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Ten minutes a day doesn't sound huge, yet those hours soon add up.",
        "translation": "Small daily blocks of ten minutes accumulate into many hours over time."
      },
      {
        "sentence": "Check the timeline again—something about his alibi doesn't add up.",
        "translation": "Review the timeline because his excuse lacks logical consistency."
      }
    ]
  },
  {
    "id": "en_b2_39",
    "language": "en",
    "pattern": "ask out",
    "title": "ask out (Phrasal Verb)",
    "shortExplanation": "Invite someone on a date to a café, dinner, or movie.",
    "longExplanation": "Nearly always puts the person between \"ask\" and \"out\" (\"He finally asked her out\").",
    "formation": "Subject + ask + Person + out",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "He was nervous for weeks before finally asking her out for coffee.",
        "translation": "After weeks of hesitation, he invited her on a coffee date."
      },
      {
        "sentence": "Has anyone ever asked you out right after a language exchange?",
        "translation": "Did someone invite you on a date following a language meetup?"
      }
    ]
  },
  {
    "id": "en_b2_40",
    "language": "en",
    "pattern": "back up",
    "title": "back up (Phrasal Verb)",
    "shortExplanation": "Save a safety copy of files, support a claim with evidence, or reverse a car.",
    "longExplanation": "Note noun/adj \"a backup\" (one word) vs phrasal verb \"back up\" (two words). Separable (\"back your claim up\").",
    "formation": "Subject + back up (+ Data/Claim/Car)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Always back up your study deck before switching devices.",
        "translation": "Save an extra copy of your study cards prior to changing devices."
      },
      {
        "sentence": "She backed up her argument with three clear examples from the text.",
        "translation": "Her point was supported by three concrete examples in the reading."
      }
    ]
  },
  {
    "id": "en_b2_41",
    "language": "en",
    "pattern": "back down",
    "title": "back down (Phrasal Verb)",
    "shortExplanation": "Stop defending a demand or position when faced with strong pressure or resistance.",
    "longExplanation": "Intransitive: NEVER takes a direct object (say \"refused to back down\", NOT \"back down it\").",
    "formation": "Subject + back down (+ from + Stand)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Even when critics pushed hard, the director wouldn't back down.",
        "translation": "The director held firm despite heavy criticism."
      },
      {
        "sentence": "Neither side seemed willing to back down during the long debate.",
        "translation": "Both parties stood their ground throughout the debate."
      }
    ]
  },
  {
    "id": "en_b2_42",
    "language": "en",
    "pattern": "break through",
    "title": "break through (Phrasal Verb)",
    "shortExplanation": "Force a way past a physical wall or overcome a stubborn mental/skill plateau.",
    "longExplanation": "Also forms noun \"a breakthrough\" (= major discovery or sudden progress after feeling stuck).",
    "formation": "Subject + break through (+ Barrier)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Consistent daily listening helps you break through the intermediate plateau.",
        "translation": "Daily listening lets you push past getting stuck at intermediate level."
      },
      {
        "sentence": "Sunlight finally broke through the thick morning fog.",
        "translation": "The sun pierced past the dense morning mist at last."
      }
    ]
  },
  {
    "id": "en_b2_43",
    "language": "en",
    "pattern": "bring about",
    "title": "bring about (Phrasal Verb)",
    "shortExplanation": "Cause an important change, reform, or outcome to happen.",
    "longExplanation": "Usually pairs with abstract results like \"change\", \"reform\", \"recovery\", \"peace\". Formal alternative to \"cause\".",
    "formation": "Subject + bring about + Change/Result",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Subtitled media has brought about a huge shift in self-study habits.",
        "translation": "Media with subtitles caused a major change in how people study alone."
      },
      {
        "sentence": "What brought about such a dramatic turnaround in team morale?",
        "translation": "What caused team morale to improve so sharply?"
      }
    ]
  },
  {
    "id": "en_b2_44",
    "language": "en",
    "pattern": "come about",
    "title": "come about (Phrasal Verb)",
    "shortExplanation": "Happen or start to exist—often asked when wondering how an unexpected situation started.",
    "longExplanation": "Strictly intransitive (NEVER passive: NEVER say \"was come about\"). Frequent with \"How did that come about?\"",
    "formation": "Subject + come about",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "How did the idea for dual-language captions first come about?",
        "translation": "How did the concept of bilingual captions originate?"
      },
      {
        "sentence": "Several welcome improvements came about after listener feedback.",
        "translation": "Several helpful upgrades happened as a result of user feedback."
      }
    ]
  },
  {
    "id": "en_b2_45",
    "language": "en",
    "pattern": "do without",
    "title": "do without (Phrasal Verb)",
    "shortExplanation": "Manage comfortably—or cope—when you do not have something you normally use.",
    "longExplanation": "Also heard humorously or firmly in \"I could do without that noise!\" (= that really annoys me).",
    "formation": "Subject + do without + Noun",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Offline learners can still review smoothly—no Wi-Fi? They'll do without.",
        "translation": "Offline learners manage fine even without a Wi-Fi connection."
      },
      {
        "sentence": "Honest feedback helps, though I could do without rude comments.",
        "translation": "Helpful feedback is great, whereas rude remarks are unwelcome."
      }
    ]
  },
  {
    "id": "en_b2_46",
    "language": "en",
    "pattern": "draw on",
    "title": "draw on (Phrasal Verb)",
    "shortExplanation": "Use a reserve of experience, knowledge, research, or money when tackling a task.",
    "longExplanation": "Inseparable. Intellectual/professional tone common in interviews and essays.",
    "formation": "Subject + draw on + Experience/Data/Savings",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Great translators draw on deep cultural intuition as well as grammar.",
        "translation": "Skilled translators rely on cultural insight alongside grammar rules."
      },
      {
        "sentence": "The series draws on authentic street interviews from five cities.",
        "translation": "The show makes use of real street interviews recorded across five cities."
      }
    ]
  },
  {
    "id": "en_b2_47",
    "language": "en",
    "pattern": "draw up",
    "title": "draw up (Phrasal Verb)",
    "shortExplanation": "Prepare and write out an official plan, list, schedule, or legal contract.",
    "longExplanation": "Separable (\"draw a shortlist up\"). Usually implies thoughtful drafting rather than casual scribbling.",
    "formation": "Subject + draw up + Contract/List/Plan",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Let's draw up a realistic four-week listening plan together.",
        "translation": "Let's draft a practical four-week schedule for listening practice."
      },
      {
        "sentence": "Their legal team drew up a clear open-source license agreement.",
        "translation": "Their lawyers drafted an unambiguous open-source licensing document."
      }
    ]
  },
  {
    "id": "en_b2_48",
    "language": "en",
    "pattern": "enter into",
    "title": "enter into (Phrasal Verb)",
    "shortExplanation": "Start an official agreement/contract, begin serious talks, or become a factor in a decision.",
    "longExplanation": "Also very common negatively: \"I don't have time to enter into every minor detail.\"",
    "formation": "Subject + enter into + Agreement/Discussion/Detail",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Both studios entered into a co-production partnership last spring.",
        "translation": "The two studios signed a joint production agreement in spring."
      },
      {
        "sentence": "Money didn't even enter into her decision to volunteer abroad.",
        "translation": "Financial reasons played no part in her choice to volunteer."
      }
    ]
  },
  {
    "id": "en_b2_49",
    "language": "en",
    "pattern": "factor in",
    "title": "factor in (Phrasal Verb)",
    "shortExplanation": "Include an extra cost, delay, or variable when calculating or planning accurately.",
    "longExplanation": "Separable (\"Don't forget to factor inflation in\"). Great everyday business/planning vocabulary.",
    "formation": "Subject + factor in + Variable / factor + Noun + in",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Did you factor in travel time when picking the morning train?",
        "translation": "Did your plan account for getting to the station on time?"
      },
      {
        "sentence": "Always factor in small daily distractions so goals stay realistic.",
        "translation": "Keep daily interruptions in mind when setting realistic goals."
      }
    ]
  },
  {
    "id": "en_b2_50",
    "language": "en",
    "pattern": "give in",
    "title": "give in (Phrasal Verb)",
    "shortExplanation": "Stop resisting and finally agree or surrender to pressure, persuasion, or temptation.",
    "longExplanation": "Contrast carefully: \"give UP\" = stop trying a goal/habit; \"give IN\" = yield to pressure or someone's insistence.",
    "formation": "Subject + give in (+ to + Pressure/Temptation)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "After ten minutes of begging, I gave in and shared my fries.",
        "translation": "Unable to resist the pleading, I eventually shared my fries."
      },
      {
        "sentence": "Don't give in to impatience—natural fluency takes steady input.",
        "translation": "Resist feeling impatient because true fluency grows through steady exposure."
      }
    ]
  },
  {
    "id": "en_b2_51",
    "language": "en",
    "pattern": "go through",
    "title": "go through (Phrasal Verb)",
    "shortExplanation": "Experience a difficult event, examine/review items carefully, or complete an official procedure.",
    "longExplanation": "Inseparable. Used constantly by teachers/reviewers (\"Let's go through today's sentences together\").",
    "formation": "Subject + go through + Hardship/Process/Notes",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Let's go through the tricky idioms line by line together.",
        "translation": "We will inspect each challenging idiom carefully line by line."
      },
      {
        "sentence": "Everyone goes through a silent phase before speaking feels smooth.",
        "translation": "Every learner experiences a quiet stage prior to speaking smoothly."
      }
    ]
  },
  {
    "id": "en_b2_52",
    "language": "en",
    "pattern": "hand over",
    "title": "hand over (Phrasal Verb)",
    "shortExplanation": "Give an object, key, role, or responsibility directly into someone else's control.",
    "longExplanation": "Separable (\"hand it over\"). Covers both physical items (keys/bag) and leadership transitions.",
    "formation": "Subject + hand over + Item/Control (+ to + Person)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "After training the new host, she happily handed over the mic.",
        "translation": "Once the new presenter was ready, she passed on hosting duties."
      },
      {
        "sentence": "Please hand over your boarding pass to the gate attendant.",
        "translation": "Give your boarding pass directly to the staff member at the gate."
      }
    ]
  },
  {
    "id": "en_b2_53",
    "language": "en",
    "pattern": "lay down",
    "title": "lay down (Phrasal Verb)",
    "shortExplanation": "Establish strict rules or official guidelines, or put tools/weapons down to stop.",
    "longExplanation": "Separable in literal sense; keeps together with formal rules (\"lay down strict guidelines\").",
    "formation": "Subject + lay down + Rules/Principles/Tool",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The club laid down simple rules so beginners felt safe speaking.",
        "translation": "Club organizers set clear guidelines to help newcomers speak comfortably."
      },
      {
        "sentence": "Don't confuse \"lie down\" (rest) with \"lay down\" (set rules or objects down).",
        "translation": "Remember the difference between resting (lie down) and placing/setting (lay down)."
      }
    ]
  },
  {
    "id": "en_b2_54",
    "language": "en",
    "pattern": "phase in",
    "title": "phase in (Phrasal Verb)",
    "shortExplanation": "Introduce a new system, rule, or curriculum gradually in carefully planned stages.",
    "longExplanation": "Opposite of \"phase out\" (gradually remove). Frequent in tech rollouts, city transit, and policy updates.",
    "formation": "Subject + phase in + Policy/System",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "The school will phase in spoken exams over three semesters.",
        "translation": "Oral assessments will be rolled out gradually across three terms."
      },
      {
        "sentence": "Electric buses are being phased in across all downtown routes.",
        "translation": "City routes are switching step by step to electric buses."
      }
    ]
  },
  {
    "id": "en_b2_55",
    "language": "en",
    "pattern": "put up",
    "title": "put up (Phrasal Verb)",
    "shortExplanation": "Host someone overnight, hang a sign/poster, raise a price/hand, or tolerate annoyance (\"put up with\").",
    "longExplanation": "Notice the crucial three-word extension \"put up with + X\" = tolerate something unpleasant patiently.",
    "formation": "Subject + put up (+ with + Annoyance / Friend / Sign)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Can you put your cousin up for two nights this weekend?",
        "translation": "Could your cousin stay as an overnight guest for two nights?"
      },
      {
        "sentence": "I refuse to put up with pop-up ads interrupting every sentence.",
        "translation": "I won't tolerate constant pop-ups breaking up every line."
      }
    ]
  },
  {
    "id": "en_b2_56",
    "language": "en",
    "pattern": "rule out",
    "title": "rule out (Phrasal Verb)",
    "shortExplanation": "Decide officially or logically that an option, cause, or suspect is impossible.",
    "longExplanation": "Separable (\"Don't rule it out yet!\"). Frequently appears in news, detective shows, and medical or strategic talks.",
    "formation": "Subject + rule out + Possibility/Option",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Doctors ran two tests to rule out a seasonal allergy.",
        "translation": "Physicians ordered two tests to eliminate allergy as the cause."
      },
      {
        "sentence": "Don't rule out immersion clips just because speakers talk naturally.",
        "translation": "Avoid dismissing native clips merely due to natural speech pace."
      }
    ]
  },
  {
    "id": "en_b2_57",
    "language": "en",
    "pattern": "set out",
    "title": "set out (Phrasal Verb)",
    "shortExplanation": "Begin a journey, start with a clear goal (\"set out to explain\"), or arrange facts/items clearly.",
    "longExplanation": "Use \"set out to + Base Verb\" to describe what someone originally intended to accomplish.",
    "formation": "Subject + set out (+ to + Verb / on + Journey)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "They set out early at dawn to beat the holiday highway traffic.",
        "translation": "They left at sunrise hoping to avoid holiday traffic."
      },
      {
        "sentence": "The guide sets out three daily habits for building listening stamina.",
        "translation": "The guide lays out three clear daily habits to improve stamina."
      }
    ]
  },
  {
    "id": "en_b2_58",
    "language": "en",
    "pattern": "settle down",
    "title": "settle down (Phrasal Verb)",
    "shortExplanation": "Become calmer/quieter, get comfortable in a chair, or establish a steady adult home/life.",
    "longExplanation": "Usually intransitive; teachers tell noisy classes \"Okay, settle down now\", and vloggers talk about settling down in a city.",
    "formation": "Subject + settle down",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Once the café music softened, everyone settled down to study.",
        "translation": "After the background music quieted, people focused calmly on studying."
      },
      {
        "sentence": "After working in four countries, he decided to settle down in Osaka.",
        "translation": "Having lived in four countries, he chose Osaka as his long-term home."
      }
    ]
  },
  {
    "id": "en_b2_59",
    "language": "en",
    "pattern": "show up",
    "title": "show up (Phrasal Verb)",
    "shortExplanation": "Arrive at a place (especially late or unexpectedly), or make hidden flaws visible.",
    "longExplanation": "Everyday twin of \"turn up\" (= arrive). Also used figuratively when small errors \"show up clearly on camera\".",
    "formation": "Subject + show up (+ late/early)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Only half the study group showed up because of the heavy rain.",
        "translation": "Just half of the group arrived due to the downpour."
      },
      {
        "sentence": "He apologized after showing up twenty minutes late for rehearsal.",
        "translation": "He said sorry for arriving twenty minutes behind schedule."
      }
    ]
  },
  {
    "id": "en_b2_60",
    "language": "en",
    "pattern": "stand for",
    "title": "stand for (Phrasal Verb)",
    "shortExplanation": "Be an abbreviation for words, represent core values, or tolerate (usually negative: \"won't stand for\").",
    "longExplanation": "Inseparable. Every learner needs \"What does VIP stand for?\" plus \"What values does this brand stand for?\"",
    "formation": "Subject + stand for + Meaning/Values",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "What does SRS stand for in memory-review apps?",
        "translation": "Which full phrase do the letters SRS represent in study apps?"
      },
      {
        "sentence": "Good mentors stand for patience rather than rushing perfection.",
        "translation": "Great teachers represent patience instead of demanding instant perfection."
      }
    ]
  },
  {
    "id": "en_b2_61",
    "language": "en",
    "pattern": "take on",
    "title": "take on (Phrasal Verb)",
    "shortExplanation": "Accept new work or responsibility, employ staff, develop a new quality, or compete against someone.",
    "longExplanation": "Separable with work/staff/rivals (\"take too much on\"). Frequent when warning against overcommitting.",
    "formation": "Subject + take on + Work/Role/Challenger",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "Don't take on five hard courses in the exact same month.",
        "translation": "Avoid accepting too many demanding classes simultaneously."
      },
      {
        "sentence": "Even a routine clip takes on fresh nuance when you catch the tone.",
        "translation": "Ordinary clips reveal richer meaning once you notice speaker tone."
      }
    ]
  },
  {
    "id": "en_b2_62",
    "language": "en",
    "pattern": "take over",
    "title": "take over (Phrasal Verb)",
    "shortExplanation": "Assume control, leadership, or responsibility of a task, role, or company from someone else.",
    "longExplanation": "Works with or without an object (\"Can you take over driving?\" / \"A new editor took over last week\").",
    "formation": "Subject + take over (+ from + Person / Company/Role)",
    "level": "CEFR B2",
    "examples": [
      {
        "sentence": "My sister took over driving for the last two hours of the trip.",
        "translation": "My sister assumed driving duties for the final two hours."
      },
      {
        "sentence": "Feel free to step out—I'll take over moderating the chat.",
        "translation": "You can leave now since I'll handle chat moderation from here."
      }
    ]
  }
];

/**
 * NihonHub - Comprehensive JLPT (N5 to N2) Master Dataset
 * Structured for cumulative learning: N2 builds on N3, N4, and N5.
 */

const JLPT_DATA = {
  levels: [
    { id: 'N5', name: 'JLPT N5', title: 'Beginner / 基礎', desc: 'Basic Japanese, ~100 Kanji, ~800 Vocab, foundational grammar.' },
    { id: 'N4', name: 'JLPT N4', title: 'Elementary / 初級', desc: 'Everyday conversations, ~300 Kanji, ~1,500 Vocab, daily life situations.' },
    { id: 'N3', name: 'JLPT N3', title: 'Intermediate / 中級', desc: 'Bridge to fluency, ~650 Kanji, ~3,750 Vocab, newspapers & everyday articles.' },
    { id: 'N2', name: 'JLPT N2', title: 'Upper-Intermediate / 中上級', desc: 'Business & media, ~1,000 Kanji, ~6,000 Vocab, nuance and complex texts.' }
  ],

  kana: {
    hiragana: [
      { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
      { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
      { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
      { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
      { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
      { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
      { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
      { char: 'や', romaji: 'ya' }, { char: '', romaji: '' }, { char: 'ゆ', romaji: 'yu' }, { char: '', romaji: '' }, { char: 'よ', romaji: 'yo' },
      { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
      { char: 'わ', romaji: 'wa' }, { char: '', romaji: '' }, { char: '', romaji: '' }, { char: '', romaji: '' }, { char: 'を', romaji: 'wo' },
      { char: 'ん', romaji: 'n' }
    ],
    katakana: [
      { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
      { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
      { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
      { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
      { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
      { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
      { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
      { char: 'ヤ', romaji: 'ya' }, { char: '', romaji: '' }, { char: 'ユ', romaji: 'yu' }, { char: '', romaji: '' }, { char: 'ヨ', romaji: 'yo' },
      { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
      { char: 'ワ', romaji: 'wa' }, { char: '', romaji: '' }, { char: '', romaji: '' }, { char: '', romaji: '' }, { char: 'ヲ', romaji: 'wo' },
      { char: 'ン', romaji: 'n' }
    ]
  },

  kanji: [
    // --- N5 KANJI ---
    {
      id: 'k-n5-1',
      char: '日',
      meaning: 'Day, Sun, Japan',
      onyomi: 'ニチ, ジツ',
      kunyomi: 'ひ, -び, -か',
      level: 'N5',
      strokes: 4,
      radical: '日 (sun)',
      examples: [
        { word: '日本', reading: 'にほん', meaning: 'Japan' },
        { word: '日曜日', reading: 'にちようび', meaning: 'Sunday' },
        { word: '毎日', reading: 'まいにち', meaning: 'Every day' }
      ]
    },
    {
      id: 'k-n5-2',
      char: '本',
      meaning: 'Book, Origin, Real',
      onyomi: 'ホン',
      kunyomi: 'もと',
      level: 'N5',
      strokes: 5,
      radical: '木 (tree)',
      examples: [
        { word: '本', reading: 'ほん', meaning: 'Book' },
        { word: '日本語', reading: 'にほんご', meaning: 'Japanese language' },
        { word: '本当', reading: 'ほんとう', meaning: 'Truth, Reality' }
      ]
    },
    {
      id: 'k-n5-3',
      char: '人',
      meaning: 'Person, Human',
      onyomi: 'ジン, ニン',
      kunyomi: 'ひと',
      level: 'N5',
      strokes: 2,
      radical: '人 (person)',
      examples: [
        { word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
        { word: '三人', reading: 'さんにん', meaning: 'Three people' },
        { word: '大人', reading: 'おとな', meaning: 'Adult' }
      ]
    },
    {
      id: 'k-n5-4',
      char: '月',
      meaning: 'Month, Moon',
      onyomi: 'ゲツ, ガツ',
      kunyomi: 'つき',
      level: 'N5',
      strokes: 4,
      radical: '月 (moon)',
      examples: [
        { word: '月曜日', reading: 'げつようび', meaning: 'Monday' },
        { word: '一月', reading: 'いちがつ', meaning: 'January' },
        { word: '今月', reading: 'こんげつ', meaning: 'This month' }
      ]
    },
    {
      id: 'k-n5-5',
      char: '学',
      meaning: 'Study, Learning, Science',
      onyomi: 'ガク',
      kunyomi: 'まな・ぶ',
      level: 'N5',
      strokes: 8,
      radical: '子 (child)',
      examples: [
        { word: '学生', reading: 'がくせい', meaning: 'Student' },
        { word: '学校', reading: 'がっこう', meaning: 'School' },
        { word: '大学', reading: 'だいがく', meaning: 'University' }
      ]
    },
    {
      id: 'k-n5-6',
      char: '生',
      meaning: 'Life, Genuine, Birth',
      onyomi: 'セイ, ショウ',
      kunyomi: 'い・きる, う・まれる, なま',
      level: 'N5',
      strokes: 5,
      radical: '生 (life)',
      examples: [
        { word: '先生', reading: 'せんせい', meaning: 'Teacher' },
        { word: '誕生日', reading: 'たんじょうび', meaning: 'Birthday' },
        { word: '生きる', reading: 'いきる', meaning: 'To live' }
      ]
    },
    {
      id: 'k-n5-7',
      char: '先',
      meaning: 'Before, Ahead, Previous',
      onyomi: 'セン',
      kunyomi: 'さき, ま・ず',
      level: 'N5',
      strokes: 6,
      radical: '儿 (legs)',
      examples: [
        { word: '先週', reading: 'せんしゅう', meaning: 'Last week' },
        { word: '先生', reading: 'せんせい', meaning: 'Teacher, Master' },
        { word: 'お先に', reading: 'おさきに', meaning: 'Ahead of you' }
      ]
    },
    {
      id: 'k-n5-8',
      char: '何',
      meaning: 'What, How many',
      onyomi: 'カ',
      kunyomi: 'なに, なん',
      level: 'N5',
      strokes: 7,
      radical: '亻 (person)',
      examples: [
        { word: '何時', reading: 'なんじ', meaning: 'What time' },
        { word: '何か', reading: 'なにか', meaning: 'Something' },
        { word: '何人', reading: 'なんにん', meaning: 'How many people' }
      ]
    },
    {
      id: 'k-n5-9',
      char: '行',
      meaning: 'Go, Conduct, Line',
      onyomi: 'コウ, ギョウ',
      kunyomi: 'い・く, ゆ・く, おこな・う',
      level: 'N5',
      strokes: 6,
      radical: '行 (go)',
      examples: [
        { word: '行く', reading: 'いく', meaning: 'To go' },
        { word: '銀行', reading: 'ぎんこう', meaning: 'Bank' },
        { word: '旅行', reading: 'りょこう', meaning: 'Travel, Trip' }
      ]
    },
    {
      id: 'k-n5-10',
      char: '来',
      meaning: 'Come, Next, Future',
      onyomi: 'ライ',
      kunyomi: 'く・る, きた・る',
      level: 'N5',
      strokes: 7,
      radical: '木 (tree)',
      examples: [
        { word: '来る', reading: 'くる', meaning: 'To come' },
        { word: '来週', reading: 'らいしゅう', meaning: 'Next week' },
        { word: '未来', reading: 'みらい', meaning: 'Future' }
      ]
    },

    // --- N4 KANJI ---
    {
      id: 'k-n4-1',
      char: '会',
      meaning: 'Meet, Society, Association',
      onyomi: 'カイ, エ',
      kunyomi: 'あ・う',
      level: 'N4',
      strokes: 6,
      radical: '人 (person)',
      examples: [
        { word: '会う', reading: 'あう', meaning: 'To meet' },
        { word: '会社', reading: 'かいしゃ', meaning: 'Company' },
        { word: '会議', reading: 'かいぎ', meaning: 'Meeting, Conference' }
      ]
    },
    {
      id: 'k-n4-2',
      char: '社',
      meaning: 'Company, Shrine, Society',
      onyomi: 'シャ',
      kunyomi: 'やしろ',
      level: 'N4',
      strokes: 7,
      radical: '礻 (altar)',
      examples: [
        { word: '社会', reading: 'しゃかい', meaning: 'Society' },
        { word: '社長', reading: 'しゃちょう', meaning: 'Company President' },
        { word: '神社', reading: 'じんじゃ', meaning: 'Shinto Shrine' }
      ]
    },
    {
      id: 'k-n4-3',
      char: '思',
      meaning: 'Think, Consider, Believe',
      onyomi: 'シ',
      kunyomi: 'おも・う',
      level: 'N4',
      strokes: 9,
      radical: '心 (heart)',
      examples: [
        { word: '思う', reading: 'おもう', meaning: 'To think' },
        { word: '思い出', reading: 'おもいで', meaning: 'Memory' },
        { word: '思い出す', reading: 'おもいだす', meaning: 'To recall, remember' }
      ]
    },
    {
      id: 'k-n4-4',
      char: '言',
      meaning: 'Say, Word, Speech',
      onyomi: 'ゲン, ゴン',
      kunyomi: 'い・う, こと',
      level: 'N4',
      strokes: 7,
      radical: '言 (words)',
      examples: [
        { word: '言う', reading: 'いう', meaning: 'To say' },
        { word: '言葉', reading: 'ことば', meaning: 'Word, Language' },
        { word: '方言', reading: 'ほうげん', meaning: 'Dialect' }
      ]
    },
    {
      id: 'k-n4-5',
      char: '心',
      meaning: 'Heart, Mind, Spirit',
      onyomi: 'シン',
      kunyomi: 'こころ',
      level: 'N4',
      strokes: 4,
      radical: '心 (heart)',
      examples: [
        { word: '心', reading: 'こころ', meaning: 'Heart, Mind' },
        { word: '安心', reading: 'あんしん', meaning: 'Peace of mind, Relief' },
        { word: '心配', reading: 'しんぱい', meaning: 'Worry, Concern' }
      ]
    },
    {
      id: 'k-n4-6',
      char: '開',
      meaning: 'Open, Unfold, Bloom',
      onyomi: 'カイ',
      kunyomi: 'ひら・く, あ・ける',
      level: 'N4',
      strokes: 12,
      radical: '門 (gate)',
      examples: [
        { word: '開ける', reading: 'あける', meaning: 'To open (something)' },
        { word: '開く', reading: 'ひらく', meaning: 'To open / hold (an event)' },
        { word: '開始', reading: 'かいし', meaning: 'Start, Commencement' }
      ]
    },
    {
      id: 'k-n4-7',
      char: '閉',
      meaning: 'Close, Shut',
      onyomi: 'ヘイ',
      kunyomi: 'と・じる, し・める',
      level: 'N4',
      strokes: 11,
      radical: '門 (gate)',
      examples: [
        { word: '閉める', reading: 'しめる', meaning: 'To close' },
        { word: '閉じる', reading: 'とじる', meaning: 'To close (eyes, book)' },
        { word: '閉店', reading: 'へいてん', meaning: 'Store closing' }
      ]
    },
    {
      id: 'k-n4-8',
      char: '待',
      meaning: 'Wait, Depend on',
      onyomi: 'タイ',
      kunyomi: 'ま・つ',
      level: 'N4',
      strokes: 9,
      radical: '彳 (step)',
      examples: [
        { word: '待つ', reading: 'まつ', meaning: 'To wait' },
        { word: '期待', reading: 'きたい', meaning: 'Expectation, Hope' },
        { word: '待ち合わせ', reading: 'まちあわせ', meaning: 'Rendezvous, Meeting up' }
      ]
    },

    // --- N3 KANJI ---
    {
      id: 'k-n3-1',
      char: '政',
      meaning: 'Politics, Government, Rule',
      onyomi: 'セイ, ショウ',
      kunyomi: 'まつりごと',
      level: 'N3',
      strokes: 9,
      radical: '攵 (strike)',
      examples: [
        { word: '政治', reading: 'せいじ', meaning: 'Politics' },
        { word: '政府', reading: 'せいふ', meaning: 'Government' },
        { word: '政策', reading: 'せいさく', meaning: 'Policy' }
      ]
    },
    {
      id: 'k-n3-2',
      char: '経',
      meaning: 'Pass through, Manage, Sūtra',
      onyomi: 'ケイ, キョウ',
      kunyomi: 'へ・る, た・つ',
      level: 'N3',
      strokes: 11,
      radical: '糸 (thread)',
      examples: [
        { word: '経済', reading: 'けいざい', meaning: 'Economy' },
        { word: '経験', reading: 'けいけん', meaning: 'Experience' },
        { word: '経営', reading: 'けいえい', meaning: 'Management, Administration' }
      ]
    },
    {
      id: 'k-n3-3',
      char: '済',
      meaning: 'Settle, Relieve, Finish',
      onyomi: 'サイ, セイ',
      kunyomi: 'す・む, す・ます',
      level: 'N3',
      strokes: 11,
      radical: '氵 (water)',
      examples: [
        { word: '済む', reading: 'すむ', meaning: 'To finish, be completed' },
        { word: '経済', reading: 'けいざい', meaning: 'Economy' },
        { word: '返済', reading: 'へんさい', meaning: 'Repayment' }
      ]
    },
    {
      id: 'k-n3-4',
      char: '際',
      meaning: 'Occasion, Edge, Limit, International',
      onyomi: 'サイ',
      kunyomi: 'きわ',
      level: 'N3',
      strokes: 14,
      radical: '阝 (hill)',
      examples: [
        { word: '国際', reading: 'こくさい', meaning: 'International' },
        { word: '交際', reading: 'こうさい', meaning: 'Social intercourse, Dating' },
        { word: '〜の際', reading: '〜のさい', meaning: 'At the time of, When' }
      ]
    },
    {
      id: 'k-n3-5',
      char: '情',
      meaning: 'Emotion, Condition, Information',
      onyomi: 'ジョウ, セイ',
      kunyomi: 'なさ・け',
      level: 'N3',
      strokes: 11,
      radical: '忄 (heart)',
      examples: [
        { word: '情報', reading: 'じょうほう', meaning: 'Information, News' },
        { word: '感情', reading: 'かんじょう', meaning: 'Emotion, Feeling' },
        { word: '表情', reading: 'ひょうじょう', meaning: 'Facial expression' }
      ]
    },
    {
      id: 'k-n3-6',
      char: '報',
      meaning: 'Report, Reward, News',
      onyomi: 'ホウ',
      kunyomi: 'むく・いる',
      level: 'N3',
      strokes: 12,
      radical: '土 (earth)',
      examples: [
        { word: '報告', reading: 'ほうこく', meaning: 'Report, Briefing' },
        { word: '天気予報', reading: 'てんきよほう', meaning: 'Weather forecast' },
        { word: '情報', reading: 'じょうほう', meaning: 'Information' }
      ]
    },
    {
      id: 'k-n3-7',
      char: '連',
      meaning: 'Connect, Take along, Lead',
      onyomi: 'レン',
      kunyomi: 'つら・なる, つ・れる',
      level: 'N3',
      strokes: 10,
      radical: '辶 (road)',
      examples: [
        { word: '連絡', reading: 'れんらく', meaning: 'Contact, Communication' },
        { word: '連れて行く', reading: 'つれていく', meaning: 'To take someone along' },
        { word: '連続', reading: 'れんぞく', meaning: 'Continuous, Series' }
      ]
    },

    // --- N2 KANJI ---
    {
      id: 'k-n2-1',
      char: '概',
      meaning: 'Outline, Approximate, General',
      onyomi: 'ガイ',
      kunyomi: 'おおむ・ね',
      level: 'N2',
      strokes: 14,
      radical: '木 (tree)',
      examples: [
        { word: '概要', reading: 'がいよう', meaning: 'Outline, Summary, Overview' },
        { word: '概念', reading: 'がいねん', meaning: 'Concept, General idea' },
        { word: '概ね', reading: 'おおむね', meaning: 'Generally, Mostly' }
      ]
    },
    {
      id: 'k-n2-2',
      char: '構',
      meaning: 'Structure, Construct, Mind',
      onyomi: 'コウ',
      kunyomi: 'かま・える, かま・う',
      level: 'N2',
      strokes: 14,
      radical: '木 (tree)',
      examples: [
        { word: '構造', reading: 'こうぞう', meaning: 'Structure, Construction' },
        { word: '構成', reading: 'こうせい', meaning: 'Composition, Organization' },
        { word: '構わない', reading: 'かまわない', meaning: 'No problem, Does not matter' }
      ]
    },
    {
      id: 'k-n2-3',
      char: '促',
      meaning: 'Urge, Demand, Stimulate',
      onyomi: 'ソク',
      kunyomi: 'うなが・す',
      level: 'N2',
      strokes: 9,
      radical: '亻 (person)',
      examples: [
        { word: '促す', reading: 'うながす', meaning: 'To urge, stimulate, hasten' },
        { word: '促進', reading: 'そくしん', meaning: 'Promotion, Acceleration' },
        { word: '督促', reading: 'とくそく', meaning: 'Demand, Reminder, Pressing' }
      ]
    },
    {
      id: 'k-n2-4',
      char: '及',
      meaning: 'Reach out, Exert, Extend to',
      onyomi: 'キュウ',
      kunyomi: 'およ・ぶ, およ・ぼす',
      level: 'N2',
      strokes: 3,
      radical: '又 (again)',
      examples: [
        { word: '及ぼす', reading: 'およぼす', meaning: 'To exert, cause, affect' },
        { word: '普及', reading: 'ふきゅう', meaning: 'Spread, Popularization' },
        { word: '及び', reading: 'および', meaning: 'And, As well as' }
      ]
    },
    {
      id: 'k-n2-5',
      char: '把',
      meaning: 'Grasp, Hold, Bundle',
      onyomi: 'ハ',
      kunyomi: 'と・る, たば',
      level: 'N2',
      strokes: 7,
      radical: '扌 (hand)',
      examples: [
        { word: '把握', reading: 'はあく', meaning: 'Grasp, Catch, Comprehend' },
        { word: '把手', reading: 'はしゅ', meaning: 'Handle, Grip' }
      ]
    },
    {
      id: 'k-n2-6',
      char: '握',
      meaning: 'Grip, Hold, Clench',
      onyomi: 'アク',
      kunyomi: 'にぎ・る',
      level: 'N2',
      strokes: 12,
      radical: '扌 (hand)',
      examples: [
        { word: '握る', reading: 'にぎる', meaning: 'To hold, grasp, mould' },
        { word: '握手', reading: 'あくしゅ', meaning: 'Handshake' },
        { word: '把握', reading: 'はあく', meaning: 'Grasp, Understanding' }
      ]
    },
    {
      id: 'k-n2-7',
      char: '厳',
      meaning: 'Strict, Severe, Rigorous',
      onyomi: 'ゲン, ゴン',
      kunyomi: 'きび・しい, おごそ・か',
      level: 'N2',
      strokes: 17,
      radical: '厂 (cliff)',
      examples: [
        { word: '厳しい', reading: 'きびしい', meaning: 'Strict, Severe' },
        { word: '厳重', reading: 'げんじゅう', meaning: 'Strict, Secure, Stringent' },
        { word: '厳密', reading: 'げんみつ', meaning: 'Precise, Exact, Strict' }
      ]
    }
  ],

  vocabulary: [
    // --- N5 VOCABULARY ---
    {
      id: 'v-n5-1',
      word: '猫',
      reading: 'ねこ',
      romaji: 'neko',
      meaning: 'Cat',
      level: 'N5',
      pos: 'Noun',
      example: {
        ja: '私の家に可愛い猫がいます。',
        furigana: '私[わたし]の 家[いえ]に 可愛[かわい]い 猫[ねこ]がいます。',
        en: 'There is a cute cat in my house.'
      }
    },
    {
      id: 'v-n5-2',
      word: '食べる',
      reading: 'たべる',
      romaji: 'taberu',
      meaning: 'To eat',
      level: 'N5',
      pos: 'Ichidan Verb',
      example: {
        ja: '毎朝、パンを食べます。',
        furigana: '毎朝[まいあさ]、パンを 食[た]べます。',
        en: 'I eat bread every morning.'
      }
    },
    {
      id: 'v-n5-3',
      word: '飲む',
      reading: 'のむ',
      romaji: 'nomu',
      meaning: 'To drink',
      level: 'N5',
      pos: 'Godan Verb',
      example: {
        ja: '冷たい水を飲みました。',
        furigana: '冷[つめ]たい 水[みず]を 飲[の]みました。',
        en: 'I drank cold water.'
      }
    },
    {
      id: 'v-n5-4',
      word: '友達',
      reading: 'ともだち',
      romaji: 'tomodachi',
      meaning: 'Friend',
      level: 'N5',
      pos: 'Noun',
      example: {
        ja: '昨日、友達と映画を見ました。',
        furigana: '昨日[きのう]、友達[ともだち]と 映画[えいが]を 見[み]ました。',
        en: 'Yesterday, I watched a movie with my friend.'
      }
    },
    {
      id: 'v-n5-5',
      word: '大きい',
      reading: 'おおきい',
      romaji: 'ookii',
      meaning: 'Big, Large',
      level: 'N5',
      pos: 'I-Adjective',
      example: {
        ja: 'あの犬はとても大きいです。',
        furigana: 'あの 犬[いぬ]はとても 大[おお]きいです。',
        en: 'That dog is very big.'
      }
    },
    {
      id: 'v-n5-6',
      word: '小さい',
      reading: 'ちいさい',
      romaji: 'chiisai',
      meaning: 'Small, Little',
      level: 'N5',
      pos: 'I-Adjective',
      example: {
        ja: 'この部屋は少し小さいです。',
        furigana: 'この 部屋[へや]は 少[すこ]し 小[ちい]さいです。',
        en: 'This room is a bit small.'
      }
    },
    {
      id: 'v-n5-7',
      word: '今日',
      reading: 'きょう',
      romaji: 'kyou',
      meaning: 'Today',
      level: 'N5',
      pos: 'Noun / Adverb',
      example: {
        ja: '今日は天気がとてもいいですね。',
        furigana: '今日[きょう]は 天気[てんき]がとてもいいですね。',
        en: 'The weather is very nice today, isn’t it?'
      }
    },
    {
      id: 'v-n5-8',
      word: '時間',
      reading: 'じかん',
      romaji: 'jikan',
      meaning: 'Time, Hours',
      level: 'N5',
      pos: 'Noun',
      example: {
        ja: '日本語を勉強する時間がありません。',
        furigana: '日本語[にほんご]を 勉強[べんきょう]する 時間[じかん]がありません。',
        en: 'I don’t have time to study Japanese.'
      }
    },

    // --- N4 VOCABULARY ---
    {
      id: 'v-n4-1',
      word: '案内する',
      reading: 'あんないする',
      romaji: 'annai suru',
      meaning: 'To guide, show around',
      level: 'N4',
      pos: 'Suru Verb',
      example: {
        ja: '東京の街を案内します。',
        furigana: '東京[とうきょう]の 街[まち]を 案内[あんない]します。',
        en: 'I will show you around the streets of Tokyo.'
      }
    },
    {
      id: 'v-n4-2',
      word: '約束',
      reading: 'やくそく',
      romaji: 'yakusoku',
      meaning: 'Promise, Appointment',
      level: 'N4',
      pos: 'Noun / Suru Verb',
      example: {
        ja: '友達と会う約束があります。',
        furigana: '友達[ともだち]と 会[あ]う 約束[やくそく]があります。',
        en: 'I have an appointment to meet a friend.'
      }
    },
    {
      id: 'v-n4-3',
      word: '複雑',
      reading: 'ふくざつ',
      romaji: 'fukuzatsu',
      meaning: 'Complex, Complicated',
      level: 'N4',
      pos: 'Na-Adjective',
      example: {
        ja: 'この文法は少し複雑です。',
        furigana: 'この 文法[ぶんぽう]は 少[すこ]し 複雑[ふくざつ]です。',
        en: 'This grammar is a bit complicated.'
      }
    },
    {
      id: 'v-n4-4',
      word: '手伝う',
      reading: 'てつだう',
      romaji: 'tetsudau',
      meaning: 'To help, assist',
      level: 'N4',
      pos: 'Godan Verb',
      example: {
        ja: '引っ越しを手伝ってくれませんか。',
        furigana: '引[ひ]っ越[こ]しを 手伝[てつだ]ってくれませんか。',
        en: 'Could you help me with moving?'
      }
    },
    {
      id: 'v-n4-5',
      word: '経験',
      reading: 'けいけん',
      romaji: 'keiken',
      meaning: 'Experience',
      level: 'N4',
      pos: 'Noun / Suru Verb',
      example: {
        ja: '日本で働いた経験があります。',
        furigana: '日本[にほん]で 働[はたら]いた 経験[けいけん]があります。',
        en: 'I have experience working in Japan.'
      }
    },
    {
      id: 'v-n4-6',
      word: '準備',
      reading: 'じゅんび',
      romaji: 'junbi',
      meaning: 'Preparation, Readiness',
      level: 'N4',
      pos: 'Noun / Suru Verb',
      example: {
        ja: '旅行の準備ができました。',
        furigana: '旅行[りょこう]の 準備[じゅんび]ができました。',
        en: 'The preparations for the trip are complete.'
      }
    },

    // --- N3 VOCABULARY ---
    {
      id: 'v-n3-1',
      word: '効果',
      reading: 'こうか',
      romaji: 'kouka',
      meaning: 'Effect, Effectiveness, Result',
      level: 'N3',
      pos: 'Noun',
      example: {
        ja: 'この薬はとても効果があります。',
        furigana: 'この 薬[くすり]はとても 効果[こうか]があります。',
        en: 'This medicine is very effective.'
      }
    },
    {
      id: 'v-n3-2',
      word: '環境',
      reading: 'かんきょう',
      romaji: 'kankyou',
      meaning: 'Environment, Surroundings',
      level: 'N3',
      pos: 'Noun',
      example: {
        ja: '地球の環境を守ることは大切です。',
        furigana: '地球[ちきゅう]の 環境[かんきょう]を 守[まも]ることは 大切[たいせつ]です。',
        en: 'Protecting the Earth’s environment is important.'
      }
    },
    {
      id: 'v-n3-3',
      word: '影響',
      reading: 'えいきょう',
      romaji: 'eikyou',
      meaning: 'Influence, Impact',
      level: 'N3',
      pos: 'Noun / Suru Verb',
      example: {
        ja: 'SNSは若者に強い影響を与えている。',
        furigana: 'SNSは 若者[わかもの]に 強[つよ]い 影響[えいきょう]を 与[あた]えている。',
        en: 'Social media exerts a strong influence on young people.'
      }
    },
    {
      id: 'v-n3-4',
      word: '具体的に',
      reading: 'ぐたいてきに',
      romaji: 'gutaiteki ni',
      meaning: 'Concretely, Specifically',
      level: 'N3',
      pos: 'Adverb',
      example: {
        ja: 'もう少し具体的に説明してください。',
        furigana: 'もう 少[すこ]し 具体的に[ぐたいてきに] 説明[せつめい]してください。',
        en: 'Please explain a little more specifically.'
      }
    },
    {
      id: 'v-n3-5',
      word: '解決',
      reading: 'かいけつ',
      romaji: 'kaiketsu',
      meaning: 'Solution, Settlement, Resolution',
      level: 'N3',
      pos: 'Noun / Suru Verb',
      example: {
        ja: 'この問題はすぐに解決できるだろう。',
        furigana: 'この 問題[もんだい]はすぐに 解決[かいけつ]できるだろう。',
        en: 'This problem will probably be solved immediately.'
      }
    },
    {
      id: 'v-n3-6',
      word: '傾向',
      reading: 'けいこう',
      romaji: 'keikou',
      meaning: 'Tendency, Trend, Inclination',
      level: 'N3',
      pos: 'Noun',
      example: {
        ja: '物価が上昇する傾向にある。',
        furigana: '物価[ぶっか]が 上昇[じょうしょう]する 傾向[けいこう]にある。',
        en: 'Prices have a tendency to rise.'
      }
    },

    // --- N2 VOCABULARY ---
    {
      id: 'v-n2-1',
      word: '把握する',
      reading: 'はあくする',
      romaji: 'haaku suru',
      meaning: 'To grasp, understand thoroughly',
      level: 'N2',
      pos: 'Suru Verb',
      example: {
        ja: '現状を正しく把握することが重要だ。',
        furigana: '現状[げんじょう]を 正[ただ]しく 把握[はあく]することが 重要[じゅうよう]だ。',
        en: 'It is essential to correctly grasp the current situation.'
      }
    },
    {
      id: 'v-n2-2',
      word: '柔軟',
      reading: 'じゅうなん',
      romaji: 'juunan',
      meaning: 'Flexible, Adaptable, Pliant',
      level: 'N2',
      pos: 'Na-Adjective',
      example: {
        ja: '変化に対して柔軟な対応が求められる。',
        furigana: '変化[へんか]に 対[たい]して 柔軟[じゅうなん]な 対応[たいおう]が 求[もと]められる。',
        en: 'Flexible responses to changes are required.'
      }
    },
    {
      id: 'v-n2-3',
      word: '促進する',
      reading: 'そくしんする',
      romaji: 'sokushin suru',
      meaning: 'To accelerate, promote, boost',
      level: 'N2',
      pos: 'Suru Verb',
      example: {
        ja: '政府は再生可能エネルギーの普及を促進している。',
        furigana: '政府[せいふ]は 再生[さいせい]可能[かのう]エネルギーの 普及[ふきゅう]を 促進[そくしん]している。',
        en: 'The government is promoting the adoption of renewable energy.'
      }
    },
    {
      id: 'v-n2-4',
      word: '懸念',
      reading: 'けねん',
      romaji: 'kenen',
      meaning: 'Concern, Worry, Anxiety, Misgiving',
      level: 'N2',
      pos: 'Noun / Suru Verb',
      example: {
        ja: '景気の悪化が懸念されている。',
        furigana: '景気[けいき]の 悪化[あっか]が 懸念[けねん]されている。',
        en: 'Deterioration of the economy is being feared with concern.'
      }
    },
    {
      id: 'v-n2-5',
      word: '該当する',
      reading: 'がいとうする',
      romaji: 'gaitou suru',
      meaning: 'To correspond to, fall under, apply to',
      level: 'N2',
      pos: 'Suru Verb',
      example: {
        ja: '条件に該当する方のみご応募ください。',
        furigana: '条件[じょうけん]に 該当[がいとう]する 方[かた]のみご 応募[おうぼ]ください。',
        en: 'Please apply only if you meet the conditions.'
      }
    },
    {
      id: 'v-n2-6',
      word: '著しい',
      reading: 'いちじるしい',
      romaji: 'ichijirushii',
      meaning: 'Remarkable, Striking, Conspicuous',
      level: 'N2',
      pos: 'I-Adjective',
      example: {
        ja: 'AI技術の進歩は著しい。',
        furigana: 'AI技術[ぎじゅつ]の 進歩[しんぽ]は 著[いちじる]しい。',
        en: 'The advancement of AI technology is remarkable.'
      }
    }
  ],

  grammar: [
    // --- N5 GRAMMAR ---
    {
      id: 'g-n5-1',
      pattern: '〜は〜です',
      level: 'N5',
      meaning: 'A is B (Topic and predicate)',
      formula: 'Noun A + は + Noun / Na-Adj B + です',
      explanation: 'The fundamental sentence structure in Japanese. は (pronounced "wa") marks the topic, and です serves as the polite copula.',
      nuance: 'Polite, foundational.',
      examples: [
        {
          ja: '私は学生です。',
          furigana: '私[わたし]は 学生[がくせい]です。',
          en: 'I am a student.'
        },
        {
          ja: '田中さんは親切です。',
          furigana: '田中[たなか]さんは 親切[しんせつ]です。',
          en: 'Mr. Tanaka is kind.'
        }
      ]
    },
    {
      id: 'g-n5-2',
      pattern: '〜てください',
      level: 'N5',
      meaning: 'Please do (Polite request)',
      formula: 'Verb (て-form) + ください',
      explanation: 'Used to politely ask someone to perform an action.',
      nuance: 'Standard polite request. In formal business settings, 〜ていただけますか is preferred.',
      examples: [
        {
          ja: 'ここに名前を書いてください。',
          furigana: 'ここに 名前[なまえ]を 書[か]いてください。',
          en: 'Please write your name here.'
        },
        {
          ja: 'ゆっくり話してください。',
          furigana: 'ゆっくり 話[はな]してください。',
          en: 'Please speak slowly.'
        }
      ]
    },
    {
      id: 'g-n5-3',
      pattern: '〜たいです',
      level: 'N5',
      meaning: 'Want to do (Personal desire)',
      formula: 'Verb (ます stem) + たいです',
      explanation: 'Expresses the speaker’s own desire to do an action. Conjugates like an い-adjective (e.g., たくない, たかった).',
      nuance: 'Used for first-person (or second-person in questions). Not directly used for third-person desires without 〜がっている.',
      examples: [
        {
          ja: '日本へ行きたいです。',
          furigana: '日本[にほん]へ 行[い]きたいです。',
          en: 'I want to go to Japan.'
        },
        {
          ja: 'ラーメンが食べたいです。',
          furigana: 'ラーメンが 食[た]べたいです。',
          en: 'I want to eat ramen.'
        }
      ]
    },
    {
      id: 'g-n5-4',
      pattern: '〜てもいいです',
      level: 'N5',
      meaning: 'May do, Is it okay to... (Permission)',
      formula: 'Verb (て-form) + もいいです (か)',
      explanation: 'Used to grant or ask for permission.',
      nuance: 'Polite permission.',
      examples: [
        {
          ja: '写真を撮ってもいいですか。',
          furigana: '写真[しゃしん]を 撮[と]ってもいいですか。',
          en: 'May I take a photo?'
        },
        {
          ja: 'ここで休んでもいいですよ。',
          furigana: 'ここで 休[やす]んでもいいですよ。',
          en: 'You may rest here.'
        }
      ]
    },

    // --- N4 GRAMMAR ---
    {
      id: 'g-n4-1',
      pattern: '〜てはいけません',
      level: 'N4',
      meaning: 'Must not do (Prohibition)',
      formula: 'Verb (て-form) + はいけません / はだめです',
      explanation: 'Strong prohibition against doing something.',
      nuance: 'Direct rule/prohibition. Often used in instructions, notices, and rules.',
      examples: [
        {
          ja: 'ここでタバコを吸ってはいけません。',
          furigana: 'ここでタバコを 吸[す]ってはいけません。',
          en: 'You must not smoke cigarettes here.'
        },
        {
          ja: '試験中にスマホを使ってはいけません。',
          furigana: '試験[しけん]中[ちゅう]にスマホを 使[つか]ってはいけません。',
          en: 'You must not use your smartphone during the exam.'
        }
      ]
    },
    {
      id: 'g-n4-2',
      pattern: '〜たことがある',
      level: 'N4',
      meaning: 'Have the experience of doing',
      formula: 'Verb (た-form) + ことがある / ことがあります',
      explanation: 'Refers to past life experiences.',
      nuance: 'Focuses on whether an experience has ever occurred in the past.',
      examples: [
        {
          ja: '富士山に登ったことがあります。',
          furigana: '富士山[ふじさん]に 登[のぼ]ったことがあります。',
          en: 'I have climbed Mt. Fuji before.'
        },
        {
          ja: '納豆を食べたことがありますか。',
          furigana: '納豆[なっとう]を 食[た]べたことがありますか。',
          en: 'Have you ever eaten natto?'
        }
      ]
    },
    {
      id: 'g-n4-3',
      pattern: '〜すぎる',
      level: 'N4',
      meaning: 'Too much, Excessively',
      formula: 'Verb (ます stem) / Adj stem + すぎる',
      explanation: 'Expresses that an action or quality exceeds a normal or acceptable degree, usually with negative connotation.',
      nuance: 'Excess beyond moderation.',
      examples: [
        {
          ja: '昨日の夜、食べすぎました。',
          furigana: '昨日[きのう]の 夜[よる]、食[た]べすぎました。',
          en: 'I ate too much last night.'
        },
        {
          ja: 'このテストは難しすぎます。',
          furigana: 'このテストは 難[むずか]しすぎます。',
          en: 'This test is too difficult.'
        }
      ]
    },
    {
      id: 'g-n4-4',
      pattern: '〜つもりです',
      level: 'N4',
      meaning: 'Intend to do, Plan to',
      formula: 'Verb (Dictionary / ない form) + つもりです',
      explanation: 'States a personal intention or resolve for the future.',
      nuance: 'Speaker’s personal conviction or plan.',
      examples: [
        {
          ja: '来年、日本へ留学するつもりです。',
          furigana: '来年[らいねん]、日本[にほん]へ 留学[りゅうがく]するつもりです。',
          en: 'I intend to study abroad in Japan next year.'
        }
      ]
    },

    // --- N3 GRAMMAR ---
    {
      id: 'g-n3-1',
      pattern: '〜わけにはいかない',
      level: 'N3',
      meaning: 'Cannot afford to, Impossible to do due to social/moral reasons',
      formula: 'Verb (Dictionary / ない form) + わけにはいかない',
      explanation: 'Expresses psychological, social, or moral constraint making it impossible to perform (or avoid) an action.',
      nuance: 'Not physical inability, but internal/social conscience or duty prevents it.',
      examples: [
        {
          ja: '大事な会議だから、遅れるわけにはいかない。',
          furigana: '大事[だいじ]な 会議[かいぎ]だから、遅[おく]れるわけにはいかない。',
          en: 'Because it is an important meeting, I cannot afford to be late.'
        },
        {
          ja: '友人に頼まれたので、断るわけにはいかない。',
          furigana: '友人[ゆうじん]に 頼[たの]まれたので、断[ことわ]るわけにはいかない。',
          en: 'Since my friend asked me, I cannot very well refuse.'
        }
      ]
    },
    {
      id: 'g-n3-2',
      pattern: '〜に対して (にたいして)',
      level: 'N3',
      meaning: 'In contrast to, Towards, Regarding',
      formula: 'Noun + に対して / Verb (Plain) + のに対して',
      explanation: 'Highlights contrast between two subjects, or points action toward a target recipient.',
      nuance: 'Analytical comparison or direction of action.',
      examples: [
        {
          ja: '兄は活発なのに対して、弟は物静かだ。',
          furigana: '兄[あに]は 活発[かっぱつ]なのに対[たい]して、弟[おとうと]は 物静[ものしず]かだ。',
          en: 'In contrast to his older brother who is active, the younger brother is quiet.'
        },
        {
          ja: 'お客様に対して丁寧な言葉遣いをする。',
          furigana: 'お客様[おきゃくさま]に対[たい]して 丁寧[ていねい]な 言葉遣[ことばづか]いをする。',
          en: 'Use polite language toward customers.'
        }
      ]
    },
    {
      id: 'g-n3-3',
      pattern: '〜に基づいて (にもとづいて)',
      level: 'N3',
      meaning: 'Based on, In accordance with',
      formula: 'Noun + に基づいて / に基づく + Noun',
      explanation: 'Indicates that something is grounded on data, facts, laws, or principles.',
      nuance: 'Formal, objective foundation.',
      examples: [
        {
          ja: '調査結果に基づいて計画を変更した。',
          furigana: '調査[ちょうさ]結果[けっか]に基[もと]づいて 計画[けいかく]を 変更[へんこう]した。',
          en: 'We revised the plan based on the survey findings.'
        }
      ]
    },
    {
      id: 'g-n3-4',
      pattern: '〜を中心に (をちゅうしんに)',
      level: 'N3',
      meaning: 'Centering on, Focusing on',
      formula: 'Noun + を中心に / を中心として',
      explanation: 'Indicates the core focus or central element of an activity or phenomenon.',
      nuance: 'Clear focal point.',
      examples: [
        {
          ja: '若者を中心として流行が広がっている。',
          furigana: '若者[わかもの]を中心[ちゅうしん]として 流行[りゅうこう]が 広[ひろ]がっている。',
          en: 'The trend is spreading with young people at its center.'
        }
      ]
    },

    // --- N2 GRAMMAR ---
    {
      id: 'g-n2-1',
      pattern: '〜にほかならない',
      level: 'N2',
      meaning: 'Nothing other than, None other than, Truly',
      formula: 'Noun + (である) / Verb (Plain) + から + にほかならない',
      explanation: 'Strongly asserts the sole, definitive reason or essence of a matter. Emphatic and decisive.',
      nuance: 'High formality, strong conviction.',
      examples: [
        {
          ja: '今回の成功は、チーム全員の努力の結果にほかならない。',
          furigana: '今回[こんかい]の 成功[せいこう]は、チーム全員[ぜんいん]の 努力[どりょく]の 結果[けっか]にほかならない。',
          en: 'This success is nothing other than the result of the entire team’s hard work.'
        },
        {
          ja: '彼が厳しいことを言うのは、君を心配しているからにほかならない。',
          furigana: '彼[かれ]が 厳[きび]しいことを 言[い]うのは、君[きみ]を 心配[しんぱい]しているからにほかならない。',
          en: 'The reason he speaks harshly is simply because he worries about you.'
        }
      ]
    },
    {
      id: 'g-n2-2',
      pattern: '〜を契機に (をけいきに)',
      level: 'N2',
      meaning: 'Taking the opportunity of, Triggered by, As a turning point',
      formula: 'Noun + を契機に / を契機として',
      explanation: 'Used when a significant change, growth, or event occurs triggered by an opportunity or turning point.',
      nuance: 'Positive or consequential milestone transformation.',
      examples: [
        {
          ja: '日本への旅行を契機に、日本語の勉強を真剣に始めた。',
          furigana: '日本[にほん]への 旅行[りょこう]を 契機[けいき]に、日本語[にほんご]の 勉強[べんきょう]を 真剣[しんけん]に 始[はじ]めた。',
          en: 'Triggered by a trip to Japan, I began studying Japanese in earnest.'
        },
        {
          ja: '転職を契機として、生活習慣を改善した。',
          furigana: '転職[てんしょく]を 契機[けいき]として、生活[せいかつ]習慣[しゅうかん]を 改善[かいぜん]した。',
          en: 'With my career change as a turning point, I improved my lifestyle habits.'
        }
      ]
    },
    {
      id: 'g-n2-3',
      pattern: '〜を余儀なくされる (をよぎなくされる)',
      level: 'N2',
      meaning: 'To be forced to, Have no choice but to',
      formula: 'Noun + を余儀なくされる / を余儀なくさせる',
      explanation: 'Expresses that an inevitable external circumstance forces someone into an unwanted situation or decision.',
      nuance: 'Formal, journalistic tone. External unavoidable pressure.',
      examples: [
        {
          ja: '台風の接近により、イベントの中止を余儀なくされた。',
          furigana: '台風[たいふう]の 接近[せっきん]により、イベントの 中止[ちゅうし]を 余儀[よぎ]なくされた。',
          en: 'Due to the approaching typhoon, we were forced to cancel the event.'
        },
        {
          ja: '不況のため、企業は人員削減を余儀なくされた。',
          furigana: '不況[ふきょう]のため、企業[きぎょう]は 人員[じんいん]削減[さくげん]を 余儀[よぎ]なくされた。',
          en: 'Because of the recession, the company was forced to downsize its workforce.'
        }
      ]
    },
    {
      id: 'g-n2-4',
      pattern: '〜ざるを得ない (ざるをえない)',
      level: 'N2',
      meaning: 'Cannot help but, Have no choice but to (psychological compulsion)',
      formula: 'Verb (ない stem - する becomes せ) + ざるを得ない',
      explanation: 'Indicates that although one does not want to, given the circumstances, there is no other option than to do it.',
      nuance: 'Reluctant necessity due to facts or reason.',
      examples: [
        {
          ja: '証拠が揃っている以上、彼の主張を認めざるを得ない。',
          furigana: '証拠[しょうこ]が 揃[そろ]っている 以上[いじょう]、彼[かれ]の 主張[しゅちょう]を 認[みと]めざるを得[え]ない。',
          en: 'Now that the evidence is gathered, we cannot help but acknowledge his claim.'
        },
        {
          ja: '予算が足りないため、計画を延期せざるを得ない。',
          furigana: '予算[よさん]が 足[た]りないため、計画[けいかく]を 延期[えんき]せざるを得[え]ない。',
          en: 'Because the budget is insufficient, we have no choice but to postpone the plan.'
        }
      ]
    }
  ],

  quizzes: [
    {
      id: 'q-1',
      level: 'N5',
      type: 'reading',
      question: 'What is the correct Hiragana reading for the kanji in bold: **日本** ?',
      options: ['にほん', 'にっぽん', 'まいちに', 'がくせい'],
      answerIndex: 0,
      explanation: '「日本」 is read as 「にほん」 (or にっぽん), meaning Japan.'
    },
    {
      id: 'q-2',
      level: 'N5',
      type: 'grammar',
      question: 'Fill in the blank: 私 ___ 学生です。',
      options: ['を', 'は', 'に', 'で'],
      answerIndex: 1,
      explanation: '「は」 (pronounced wa) is the topic marker particle: 私は学生です (I am a student).'
    },
    {
      id: 'q-3',
      level: 'N4',
      type: 'meaning',
      question: 'What is the English meaning of 「約束」 (やくそく)?',
      options: ['Memory', 'Promise / Appointment', 'Preparation', 'Experience'],
      answerIndex: 1,
      explanation: '「約束」 (yakusoku) means promise, appointment, or engagement.'
    },
    {
      id: 'q-4',
      level: 'N4',
      type: 'grammar',
      question: 'Choose the appropriate sentence meaning "Please don\'t smoke here": ここでタバコを___。',
      options: ['吸ってもいいです', '吸ってはいけません', '吸いたいです', '吸うつもりです'],
      answerIndex: 1,
      explanation: '「〜てはいけません」 denotes strong prohibition (Must not do).'
    },
    {
      id: 'q-5',
      level: 'N3',
      type: 'reading',
      question: 'Select the reading for **把握**: 現状を**把握**する。',
      options: ['はあく', 'ほうこく', 'はいあく', 'けいけん'],
      answerIndex: 0,
      explanation: '「把握」 is read as 「はあく」 (haaku), meaning to grasp or comprehend.'
    },
    {
      id: 'q-6',
      level: 'N3',
      type: 'grammar',
      question: 'Fill in the blank: 大事なプレゼンだから、失敗する___。',
      options: ['わけにはいかない', 'にほかならない', 'を余儀なくされる', 'ざるを得ない'],
      answerIndex: 0,
      explanation: '「〜わけにはいかない」 means "cannot afford to" due to social or moral responsibility.'
    },
    {
      id: 'q-7',
      level: 'N2',
      type: 'grammar',
      question: 'Complete the sentence: 台風によりイベントの中止を___。',
      options: ['余儀なくされた', 'ほかならなかった', '契機にした', '基づいていた'],
      answerIndex: 0,
      explanation: '「〜を余儀なくされる」 expresses being forced into an unavoidable situation by external forces.'
    },
    {
      id: 'q-8',
      level: 'N2',
      type: 'meaning',
      question: 'What is the meaning of 「著しい」 (いちじるしい)?',
      options: ['Complicated', 'Remarkable / Conspicuous', 'Strict', 'Reluctant'],
      answerIndex: 1,
      explanation: '「著しい」 means remarkable, striking, or conspicuous.'
    },
    {
      id: 'q-9',
      level: 'N5',
      type: 'meaning',
      question: 'What does 「食べる」 (たべる) mean?',
      options: ['To drink', 'To speak', 'To eat', 'To sleep'],
      answerIndex: 2,
      explanation: '「食べる」 is an Ichidan verb meaning "to eat".'
    },
    {
      id: 'q-10',
      level: 'N2',
      type: 'grammar',
      question: '彼の成功は、日々の絶え間ない努力の賜物___。',
      options: ['にほかならない', 'を契機に', 'に基づく', 'を皮切りに'],
      answerIndex: 0,
      explanation: '「〜にほかならない」 means "is none other than" / "is nothing other than".'
    }
  ]
};

// Expose globally for browser usage
if (typeof window !== 'undefined') {
  window.JLPT_DATA = JLPT_DATA;
}

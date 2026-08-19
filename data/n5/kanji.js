/**
 * JLPT N5 - Kanji Master Dataset
 * Supports multiple levels, textbook attributions (e.g. Sou Matome, Marugoto, Genki, Minna no Nihongo),
 * stroke counts, radicals, readings, and contextual examples.
 */
window.N5_KANJI_DATA = [
  {
    id: 'k-n5-001',
    char: '日',
    meaning: 'Day, Sun, Japan',
    onyomi: 'ニチ, ジツ',
    kunyomi: 'ひ, -び, -か',
    levels: ['N5'],
    strokes: 4,
    radical: '日 (sun)',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 1 Day 1', notes: 'Core calendar Kanji' },
      { book: 'Marugoto A1', lesson: 'Lesson 3', notes: 'Daily Life' },
      { book: 'Minna no Nihongo I', lesson: 'Lesson 1', notes: 'Foundational' }
    ],
    examples: [
      { word: '日本', reading: 'にほん', meaning: 'Japan', source: 'Sou Matome N5' },
      { word: '日曜日', reading: 'にちようび', meaning: 'Sunday', source: 'Marugoto A1' },
      { word: '毎日', reading: 'まいにち', meaning: 'Every day', source: 'Genki I' }
    ]
  },
  {
    id: 'k-n5-002',
    char: '本',
    meaning: 'Book, Origin, Real',
    onyomi: 'ホン',
    kunyomi: 'もと',
    levels: ['N5'],
    strokes: 5,
    radical: '木 (tree)',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 1 Day 1' },
      { book: 'Genki I', lesson: 'Lesson 2' }
    ],
    examples: [
      { word: '本', reading: 'ほん', meaning: 'Book' },
      { word: '日本語', reading: 'にほんご', meaning: 'Japanese language' },
      { word: '本当', reading: 'ほんとう', meaning: 'Truth, Reality' }
    ]
  },
  {
    id: 'k-n5-003',
    char: '人',
    meaning: 'Person, Human',
    onyomi: 'ジン, ニン',
    kunyomi: 'ひと',
    levels: ['N5'],
    strokes: 2,
    radical: '人 (person)',
    sources: [
      { book: 'Marugoto A1', lesson: 'Lesson 1' },
      { book: 'Minna no Nihongo I', lesson: 'Lesson 1' }
    ],
    examples: [
      { word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
      { word: '三人', reading: 'さんにん', meaning: 'Three people' },
      { word: '大人', reading: 'おとな', meaning: 'Adult' }
    ]
  },
  {
    id: 'k-n5-004',
    char: '月',
    meaning: 'Month, Moon',
    onyomi: 'ゲツ, ガツ',
    kunyomi: 'つき',
    levels: ['N5'],
    strokes: 4,
    radical: '月 (moon)',
    sources: [
      { book: 'Sou Matome N5', chapter: 'Week 1 Day 2' },
      { book: 'Genki I', lesson: 'Lesson 3' }
    ],
    examples: [
      { word: '月曜日', reading: 'げつようび', meaning: 'Monday' },
      { word: '一月', reading: 'いちがつ', meaning: 'January' },
      { word: '今月', reading: 'こんげつ', meaning: 'This month' }
    ]
  },
  {
    id: 'k-n5-005',
    char: '学',
    meaning: 'Study, Learning, Science',
    onyomi: 'ガク',
    kunyomi: 'まな・ぶ',
    levels: ['N5'],
    strokes: 8,
    radical: '子 (child)',
    sources: [
      { book: 'Minna no Nihongo I', lesson: 'Lesson 1' },
      { book: 'Sou Matome N5', chapter: 'Week 1 Day 3' }
    ],
    examples: [
      { word: '学生', reading: 'がくせい', meaning: 'Student' },
      { word: '学校', reading: 'がっこう', meaning: 'School' },
      { word: '大学', reading: 'だいがく', meaning: 'University' }
    ]
  },
  {
    id: 'k-n5-006',
    char: '生',
    meaning: 'Life, Genuine, Birth',
    onyomi: 'セイ, ショウ',
    kunyomi: 'い・きる, う・まれる, なま',
    levels: ['N5'],
    strokes: 5,
    radical: '生 (life)',
    sources: [
      { book: 'Marugoto A1', lesson: 'Lesson 2' },
      { book: 'Genki I', lesson: 'Lesson 1' }
    ],
    examples: [
      { word: '先生', reading: 'せんせい', meaning: 'Teacher' },
      { word: '誕生日', reading: 'たんじょうび', meaning: 'Birthday' },
      { word: '生きる', reading: 'いきる', meaning: 'To live' }
    ]
  }
];

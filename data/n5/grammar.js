/**
 * JLPT N5 - Grammar Master Dataset
 * Formulas, explanations, nuances, example sentences, and textbook sources.
 */
window.N5_GRAMMAR_DATA = [
  {
    id: 'g-n5-001',
    pattern: '〜は〜です',
    levels: ['N5'],
    meaning: 'A is B (Topic and predicate)',
    formula: 'Noun A + は + Noun / Na-Adj B + です',
    explanation: 'The fundamental sentence structure in Japanese. は (pronounced "wa") marks the topic, and です serves as the polite copula.',
    nuance: 'Polite, foundational.',
    sources: [
      { book: 'Minna no Nihongo I', lesson: 'Lesson 1' },
      { book: 'Genki I', lesson: 'Lesson 1' },
      { book: 'Marugoto A1', lesson: 'Lesson 1' }
    ],
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
    id: 'g-n5-002',
    pattern: '〜てください',
    levels: ['N5'],
    meaning: 'Please do (Polite request)',
    formula: 'Verb (て-form) + ください',
    explanation: 'Used to politely ask someone to perform an action.',
    nuance: 'Standard polite request in daily situations.',
    sources: [
      { book: 'Minna no Nihongo I', lesson: 'Lesson 14' },
      { book: 'Genki I', lesson: 'Lesson 6' }
    ],
    examples: [
      {
        ja: 'ここに名前を書いてください。',
        furigana: 'ここに 名前[なまえ]を 書[か]いてください。',
        en: 'Please write your name here.'
      }
    ]
  },
  {
    id: 'g-n5-003',
    pattern: '〜たいです',
    levels: ['N5'],
    meaning: 'Want to do (Personal desire)',
    formula: 'Verb (ます stem) + たいです',
    explanation: 'Expresses the speaker’s own desire to do an action.',
    nuance: 'First-person personal intention or request in questions.',
    sources: [
      { book: 'Minna no Nihongo I', lesson: 'Lesson 13' },
      { book: 'Genki I', lesson: 'Lesson 11' }
    ],
    examples: [
      {
        ja: '日本へ行きたいです。',
        furigana: '日本[にほん]へ 行[い]きたいです。',
        en: 'I want to go to Japan.'
      }
    ]
  }
];

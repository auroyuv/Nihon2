/**
 * Mock Exam and Quiz Dataset (JLPT N5 to N2)
 */
window.QUIZ_DATA = [
  {
    id: 'q-1',
    levels: ['N5'],
    type: 'reading',
    question: 'What is the correct Hiragana reading for the kanji in bold: **日本** ?',
    options: ['にほん', 'にっぽん', 'まいちに', 'がくせい'],
    answerIndex: 0,
    sources: [{ book: 'Sou Matome N5', chapter: 'Week 1' }, { book: 'Minna no Nihongo I', lesson: 'Lesson 1' }],
    explanation: '「日本」 is read as 「にほん」 (or にっぽん), meaning Japan.'
  },
  {
    id: 'q-2',
    levels: ['N5'],
    type: 'grammar',
    question: 'Fill in the blank: 私 ___ 学生です。',
    options: ['を', 'は', 'に', 'で'],
    answerIndex: 1,
    sources: [{ book: 'Genki I', lesson: 'Lesson 1' }, { book: 'Marugoto A1', lesson: 'Lesson 1' }],
    explanation: '「は」 (pronounced wa) is the topic marker particle: 私は学生です (I am a student).'
  },
  {
    id: 'q-3',
    levels: ['N4'],
    type: 'meaning',
    question: 'What is the English meaning of 「約束」 (やくそく)?',
    options: ['Memory', 'Promise / Appointment', 'Preparation', 'Experience'],
    answerIndex: 1,
    sources: [{ book: 'Minna no Nihongo II', lesson: 'Lesson 31' }],
    explanation: '「約束」 (yakusoku) means promise, appointment, or engagement.'
  },
  {
    id: 'q-4',
    levels: ['N4'],
    type: 'grammar',
    question: 'Choose the appropriate sentence meaning "Please don\'t smoke here": ここでタバコを___。',
    options: ['吸ってもいいです', '吸ってはいけません', '吸いたいです', '吸うつもりです'],
    answerIndex: 1,
    sources: [{ book: 'Genki II', lesson: 'Lesson 15' }],
    explanation: '「〜てはいけません」 denotes strong prohibition (Must not do).'
  },
  {
    id: 'q-5',
    levels: ['N3'],
    type: 'reading',
    question: 'Select the reading for **把握**: 現状を**把握**する。',
    options: ['はあく', 'ほうこく', 'はいあく', 'けいけん'],
    answerIndex: 0,
    sources: [{ book: 'Shin Kanzen Master N3', chapter: 'Chapter 4' }],
    explanation: '「把握」 is read as 「はあく」 (haaku), meaning to grasp or comprehend.'
  },
  {
    id: 'q-6',
    levels: ['N3'],
    type: 'grammar',
    question: 'Fill in the blank: 大事なプレゼンだから、失敗する___。',
    options: ['わけにはいかない', 'にほかならない', 'を余儀なくされる', 'ざるを得ない'],
    answerIndex: 0,
    sources: [{ book: 'Sou Matome N3 Grammar', chapter: 'Week 3' }],
    explanation: '「〜わけにはいかない」 means "cannot afford to" due to social or moral responsibility.'
  },
  {
    id: 'q-7',
    levels: ['N2'],
    type: 'grammar',
    question: 'Complete the sentence: 台風によりイベントの中止を___。',
    options: ['余儀なくされた', 'ほかならなかった', '契機にした', '基づいていた'],
    answerIndex: 0,
    sources: [{ book: 'Shin Kanzen Master N2 Grammar', chapter: 'Chapter 2' }],
    explanation: '「〜を余儀なくされる」 expresses being forced into an unavoidable situation by external forces.'
  },
  {
    id: 'q-8',
    levels: ['N2'],
    type: 'meaning',
    question: 'What is the meaning of 「著しい」 (いちじるしい)?',
    options: ['Complicated', 'Remarkable / Conspicuous', 'Strict', 'Reluctant'],
    answerIndex: 1,
    sources: [{ book: 'Sou Matome N2 Vocab', chapter: 'Week 2' }],
    explanation: '「著しい」 means remarkable, striking, or conspicuous.'
  }
];

/**
 * JLPT N4 - Listening Practice (聴解) Dataset
 */
window.N4_LISTENING_DATA = [
  {
    id: 'l-n4-001',
    title: '病院の受付で (At the Clinic Reception)',
    levels: ['N4'],
    situation: 'A patient talking to the clinic receptionist about their appointment.',
    sources: [
      { book: 'Sou Matome N4 Listening', chapter: 'Week 3' },
      { book: 'Marugoto A2 Audio', lesson: 'Lesson 5' }
    ],
    dialog: [
      { speaker: 'A (Receptionist)', text: '本日はどうされましたか。', furigana: '本日[ほんじつ]は どうされましたか。' },
      { speaker: 'B (Patient)', text: '昨日から喉が痛くて、少し熱もあります。', furigana: '昨日[きのう]から 喉[のど]が 痛[いた]くて、少[すこ]し 熱[ねつ]もあります。' },
      { speaker: 'A (Receptionist)', text: 'かしこまりました。こちらの問診票を記入してお待ちください。', furigana: 'かしこまりました。こちらの 問診票[もんしんひょう]を 記入[きにゅう]してお 待[ま]ちください。' }
    ],
    questions: [
      {
        question: 'What symptoms does the patient have?',
        options: ['Stomach ache and headache', 'Sore throat and slight fever', 'Back pain and cough', 'Toothache only'],
        answerIndex: 1,
        explanation: 'The patient states: 「喉が痛くて、少し熱もあります」 (sore throat and slight fever).'
      }
    ]
  }
];

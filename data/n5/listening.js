/**
 * JLPT N5 - Listening Practice (聴解) Dataset
 * Conversational dialogues, speaker script, Web Speech synthesis triggers, and comprehension questions.
 */
window.N5_LISTENING_DATA = [
  {
    id: 'l-n5-001',
    title: '駅での道案内 (Asking for Directions at the Station)',
    levels: ['N5'],
    situation: 'At the train station asking staff for the nearest convenience store.',
    sources: [
      { book: 'Nihongo Sou Matome N5 Listening', chapter: 'Chapter 2' },
      { book: 'Marugoto A1 Audio', lesson: 'Lesson 6' }
    ],
    dialog: [
      { speaker: 'A (Traveler)', text: 'すみません、この近くにコンビニはありますか。', furigana: 'すみません、この 近[ちか]くに コンビニは ありますか。' },
      { speaker: 'B (Staff)', text: 'はい、北口の改札を出て、右にありますよ。', furigana: 'はい、北口[きたぐち]の 改札[かいさつ]を 出[で]て、右[みぎ]にありますよ。' },
      { speaker: 'A (Traveler)', text: '北口を出て右ですね。ありがとうございます。', furigana: '北口[きたぐち]を 出[で]て 右[みぎ]ですね。ありがとうございます。' }
    ],
    questions: [
      {
        question: 'Where is the convenience store located?',
        options: ['Inside the ticket gate on the left', 'Outside the north exit on the right', 'Next to the south ticket gate', 'Inside the department store'],
        answerIndex: 1,
        explanation: 'The staff explains: 「北口の改札を出て、右にあります」 (exit the north ticket gate and it is on the right).'
      }
    ]
  }
];

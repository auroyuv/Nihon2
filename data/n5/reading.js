/**
 * JLPT N5 - Reading Comprehension (読解) Dataset
 * Passages with Furigana, English translations, vocabulary footnotes, and comprehension questions.
 */
window.N5_READING_DATA = [
  {
    id: 'r-n5-001',
    title: '私の週末 (My Weekend)',
    levels: ['N5'],
    genre: 'Diary / Daily Life',
    sources: [
      { book: 'Marugoto A1', lesson: 'Activity 8' },
      { book: 'Genki I Reading', lesson: 'Lesson 4' }
    ],
    passage: {
      ja: '先週の土曜日に友達と京都へ行きました。京都で古いお寺を見ました。天気が良くて、とても綺麗でした。お昼に美味しいラーメンを食べました。楽しい一日でした。',
      furigana: '先週[せんしゅう]の 土曜日[どようび]に 友達[ともだち]と 京都[きょうと]へ 行[い]きました。京都[きょうと]で 古[ふる]い お寺[てら]を 見[み]ました。天気[てんき]が 良[よ]くて、とても 綺麗[きれい]でした。お昼[ひる]に 美味[おい]しい ラーメンを 食[た]べました。楽[たの]しい 一日[いちにち]でした。',
      en: 'Last Saturday, I went to Kyoto with my friend. In Kyoto, we saw old temples. The weather was nice and it was very beautiful. We ate delicious ramen for lunch. It was an enjoyable day.'
    },
    vocabularyNotes: [
      { word: '先週', reading: 'せんしゅう', meaning: 'Last week' },
      { word: 'お寺', reading: 'おてら', meaning: 'Temple' },
      { word: '綺麗', reading: 'きれい', meaning: 'Beautiful / Clean' },
      { word: '一日', reading: 'いちにち', meaning: 'One day / Whole day' }
    ],
    questions: [
      {
        question: 'Where did the speaker go last Saturday?',
        options: ['Tokyo', 'Kyoto', 'Osaka', 'Fukuoka'],
        answerIndex: 1,
        explanation: 'The passage explicitly says: 「先週の土曜日に友達と京都へ行きました」 (went to Kyoto).'
      },
      {
        question: 'What did the speaker eat for lunch?',
        options: ['Sushi', 'Tempura', 'Ramen', 'Bread'],
        answerIndex: 2,
        explanation: 'The text states: 「お昼に美味しいラーメンを食べました」 (ate delicious ramen).'
      }
    ]
  }
];

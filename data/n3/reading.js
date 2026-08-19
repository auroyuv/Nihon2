/**
 * JLPT N3 - Reading Comprehension (読解) Dataset
 */
window.N3_READING_DATA = [
  {
    id: 'r-n3-001',
    title: 'テレワークの普及と生活の変化 (The Spread of Remote Work and Lifestyle Changes)',
    levels: ['N3'],
    genre: 'Article / Essay',
    sources: [
      { book: 'Shin Kanzen Master N3 Reading', chapter: 'Chapter 3' },
      { book: 'Sou Matome N3 Reading', chapter: 'Week 4' }
    ],
    passage: {
      ja: '最近、多くの企業でテレワークが導入され、自宅で仕事をする人が増えています。通勤時間がなくなることで家族と過ごす時間が増える一方、仕事とプライベートの境界が曖昧になり、オンとオフの切り替えが難しくなったという意見もあります。',
      furigana: '最近[さいきん]、多[おお]くの 企業[きぎょう]でテレワークが 導入[どうにゅう]され、自宅[じたく]で 仕事[しごと]をする 人[ひと]が 増[ふ]えています。通勤[つうきん]時間[じかん]がなくなることで 家族[かぞく]と 過[す]ごす 時間[じかん]が 増[ふ]える 一方[いっぽう]、仕事[しごと]とプライベートの 境界[きょうかい]が 曖昧[あいまい]になり、オンとオフの 切[き]り替[か]えが 難[むずか]しくなったという 意見[いけん]もあります。',
      en: 'Recently, telework has been introduced in many companies, and the number of people working from home is increasing. While the elimination of commuting time increases time spent with family, there is also the opinion that the boundary between work and private life becomes ambiguous, making it difficult to switch between on and off modes.'
    },
    vocabularyNotes: [
      { word: '導入', reading: 'どうにゅう', meaning: 'Introduction / Implementation' },
      { word: '通勤', reading: 'つうきん', meaning: 'Commuting to work' },
      { word: '境界', reading: 'きょうかい', meaning: 'Boundary / Border' },
      { word: '曖昧', reading: 'あいまい', meaning: 'Ambiguous / Vague' }
    ],
    questions: [
      {
        question: 'According to the passage, what is one challenge of telework?',
        options: ['Commuting costs have increased', 'Difficult to separate work time and personal time', 'No communication with coworkers', 'Companies do not allow family time'],
        answerIndex: 1,
        explanation: 'The passage notes: 「仕事とプライベートの境界が曖昧になり、オンとオフの切り替えが難しくなった」 (boundary became vague, switching is difficult).'
      }
    ]
  }
];

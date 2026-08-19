/**
 * JLPT N2 - Reading Comprehension (読解) Dataset
 */
window.N2_READING_DATA = [
  {
    id: 'r-n2-001',
    title: '伝統工芸の継承と現代的イノベーション (Tradition and Modern Innovation in Japanese Crafts)',
    levels: ['N2'],
    genre: 'Editorial / Opinion Essay',
    sources: [
      { book: 'Shin Kanzen Master N2 Reading', chapter: 'Chapter 5' },
      { book: 'Sou Matome N2 Reading', chapter: 'Week 3' }
    ],
    passage: {
      ja: '日本の伝統工芸は後継者不足という深刻な課題に直面している。しかし近年、伝統的な技法を保持しつつ、現代のライフスタイルに合わせたデザインや海外市場への展開を図る若手職人の動きが注目されている。単なる伝統の保存にとどまらず、時代のニーズを柔軟に取り入れることが持続可能な発展の鍵と言えよう。',
      furigana: '日本[にほん]の 伝統[でんとう]工芸[こうげい]は 後継者[こうけいしゃ]不足[ぶそく]という 深刻[しんこく]な 課題[かだい]に 直面[ちょくめん]している。しかし 近年[きんねん]、伝統的[でんとうてき]な 技法[ぎほう]を 保持[ほじ]しつつ、現代[げんだい]のライフスタイルに 合[あ]わせたデザインや 海外[かいがい]市場[しじょう]への 展開[てんかい]を 図[はか]る 若手[わかて]職人[しょくにん]の 動[うご]きが 注目[ちゅうもく]されている。単[たん]なる 伝統[でんとう]の 保存[ほぞん]にとどまらず、時代[じだい]のニーズを 柔軟[じゅうなん]に 取[と]り 入[い]れることが 持続[じぞく]可能[かのう]な 発展[はってん]の 鍵[かぎ]と 言[い]えよう。',
      en: 'Japanese traditional crafts face the serious challenge of a shortage of successors. However, in recent years, attention has been drawn to the initiatives of young artisans who, while maintaining traditional techniques, aim to adapt designs to modern lifestyles and expand into overseas markets. Rather than merely preserving tradition, flexibly incorporating the needs of the era can be called the key to sustainable development.'
    },
    vocabularyNotes: [
      { word: '伝統工芸', reading: 'でんとうこうげい', meaning: 'Traditional crafts' },
      { word: '後継者', reading: 'こうけいしゃ', meaning: 'Successor / Heir' },
      { word: '直面する', reading: 'ちょくめんする', meaning: 'To face / confront' },
      { word: '職人', reading: 'しょくにん', meaning: 'Artisan / Craftsman' },
      { word: '持続可能', reading: 'じぞくかのう', meaning: 'Sustainable' }
    ],
    questions: [
      {
        question: 'According to the author, what is essential for the sustainable future of traditional crafts?',
        options: [
          'Limiting production strictly to the domestic Japanese market',
          'Strictly preserving tradition without making any design modifications',
          'Flexibly adapting to modern needs while preserving traditional techniques',
          'Lowering prices through mass industrial factory automation'
        ],
        answerIndex: 2,
        explanation: 'The passage concludes: 「伝統的な技法を保持しつつ、現代のライフスタイルに合わせたデザイン...時代のニーズを柔軟に取り入れることが持続可能な発展の鍵」 (incorporating modern needs while maintaining traditional techniques).'
      }
    ]
  }
];

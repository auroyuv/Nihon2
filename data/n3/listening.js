/**
 * JLPT N3 - Listening Practice (聴解) Dataset
 */
window.N3_LISTENING_DATA = [
  {
    id: 'l-n3-001',
    title: '会社での業務引き継ぎ (Handing over Tasks at Work)',
    levels: ['N3'],
    situation: 'A senior employee handing over project responsibilities to a junior employee before taking vacation.',
    sources: [
      { book: 'Shin Kanzen Master N3 Listening', chapter: 'Chapter 4' },
      { book: 'Sou Matome N3 Listening', chapter: 'Week 2' }
    ],
    dialog: [
      { speaker: 'A (Senior)', text: '来週の月曜日に、A社の田中様から電話が入る予定です。', furigana: '来週[らいしゅう]の 月曜日[げつようび]に、A社[しゃ]の 田中[たなか]様[さま]から 電話[でんわ]が 入[はい]る 予定[よてい]です。' },
      { speaker: 'B (Junior)', text: 'はい。その際、見積書の修正版について確認すればよろしいでしょうか。', furigana: 'はい。その 際[さい]、見積書[みつもりしょ]の 修正版[しゅうせいばん]について 確認[かくにん]すれば よろしいでしょうか。' },
      { speaker: 'A (Senior)', text: 'ええ、その通りです。書類は共有フォルダの「02_見積」に入れてありますので、よろしくお願いします。', furigana: 'ええ、その 通[とお]りです。書類[しょるい]は 共有[きょうゆう]フォルダの「02_見積[みつもり]」に 入[い]れてありますので、よろしくお願[ねが]いします。' }
    ],
    questions: [
      {
        question: 'Where is the revised estimate document stored?',
        options: ['On Senior Tanaka’s desk', 'In the shared folder under "02_見積"', 'In an email attachment sent yesterday', 'In the company archive room'],
        answerIndex: 1,
        explanation: 'Speaker A specifies: 「書類は共有フォルダの「02_見積」に入れてあります」 (in the shared folder under "02_見積").'
      }
    ]
  }
];

/**
 * JLPT N2 - Listening Practice (聴解) Dataset
 */
window.N2_LISTENING_DATA = [
  {
    id: 'l-n2-001',
    title: '新商品の企画会議 (New Product Planning Meeting)',
    levels: ['N2'],
    situation: 'Discussion among marketing and product development teams regarding launch timeline and target demographics.',
    sources: [
      { book: 'Shin Kanzen Master N2 Listening', chapter: 'Chapter 5' },
      { book: 'Sou Matome N2 Listening', chapter: 'Week 4' }
    ],
    dialog: [
      { speaker: 'A (Product Manager)', text: '秋の新商品リリースに向けて、ターゲット層の再検討を行いたいと思います。', furigana: '秋[あき]の 新商品[しんしょうひん]リリースに 向[む]けて、ターゲット層[そう]の 再検討[さいけんとう]を 行[おこな]いたいと 思[おも]います。' },
      { speaker: 'B (Marketing Director)', text: '事前のアンケート調査によると、20代だけでなく40代のビジネス層からも高い関心が寄せられています。', furigana: '事前[じぜん]のアンケート 調査[ちょうさ]によると、20代[だい]だけでなく40代[だい]のビジネス層[そう]からも 高[たか]い 関心[かんしん]が 寄[よ]せられています。' },
      { speaker: 'A (Product Manager)', text: 'なるほど。では、パッケージデザインをより落ち着いたトーンに変更し、訴求力を高める方針で進めましょう。', furigana: 'なるほど。では、パッケージデザインをより 落[お]ち 着[つ]いたトーンに 変更[へんこう]し、訴求力[そきゅうりょく]を 高[たか]める 方針[ほうしん]で 進[すす]めましょう。' }
    ],
    questions: [
      {
        question: 'What modification was decided for the new product based on survey feedback?',
        options: [
          'Postpone the release until next spring',
          'Change package design to a more subdued tone to appeal to older demographics',
          'Reduce product features to lower retail price',
          'Cancel advertising for the 20s demographic completely'
        ],
        answerIndex: 1,
        explanation: 'Speaker A concludes: 「パッケージデザインをより落ち着いたトーンに変更し、訴求力を高める」 (change design to a more subdued tone to heighten appeal).'
      }
    ]
  }
];

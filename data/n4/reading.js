/**
 * JLPT N4 - Reading Comprehension (読解) Dataset
 */
window.N4_READING_DATA = [
  {
    id: 'r-n4-001',
    title: '日本のゴミの分別 (Waste Sorting in Japan)',
    levels: ['N4'],
    genre: 'Informative / Daily Life Rules',
    sources: [
      { book: 'Marugoto A2', lesson: 'Lesson 7' },
      { book: 'Sou Matome N4 Reading', chapter: 'Week 2' }
    ],
    passage: {
      ja: '日本ではゴミを捨てる時、燃えるゴミと燃えないゴミ、そしてペットボトルや缶に分けなければなりません。私の町では、火曜日と金曜日の朝に燃えるゴミを出します。正しく分別しないと、持って行ってもらえません。',
      furigana: '日本[にほん]ではゴミを 捨[す]てる 時[とき]、燃[も]えるゴミと 燃[も]えないゴミ、そしてペットボトルや 缶[かん]に 分[わ]けなければなりません。私[わたし]の 町[まち]では、火曜日[かようび]と 金曜日[きんようび]の 朝[あさ]に 燃[も]えるゴミを 出[だ]します。正[ただ]しく 分別[ぶんべつ]しないと、持[も]って 行[い]ってもらえません。',
      en: 'In Japan, when throwing away trash, you must separate it into burnable trash, non-burnable trash, and PET bottles/cans. In my town, burnable trash is put out on Tuesday and Friday mornings. If you do not sort it correctly, it will not be collected.'
    },
    vocabularyNotes: [
      { word: '捨てる', reading: 'すてる', meaning: 'To throw away' },
      { word: '燃えるゴミ', reading: 'もえるごみ', meaning: 'Burnable trash' },
      { word: '分別', reading: 'ぶんべつ', meaning: 'Separation / Sorting' },
      { word: '缶', reading: 'かん', meaning: 'Can / Tin' }
    ],
    questions: [
      {
        question: 'When is burnable trash collected in the speaker’s town?',
        options: ['Every morning', 'Tuesday and Friday mornings', 'Monday and Thursday evenings', 'Saturday afternoon'],
        answerIndex: 1,
        explanation: 'The passage states: 「火曜日と金曜日の朝に燃えるゴミを出します」 (Tuesday and Friday mornings).'
      }
    ]
  }
];

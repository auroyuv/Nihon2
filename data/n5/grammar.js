/**
 * JLPT N5 Grammar Master Dataset
 * Nihongo Sou Matome N5 - All in one (日本語総まとめ N5 文法)
 * Complete Textbook Curriculum (Weeks 3 to 5, 18 Lesson Modules)
 * Fully Indexed with Pattern Formulas, Explanations, Furigana, and English Translations.
 */

window.N5_GRAMMAR_DATA = [
  {
    id: 'g-n5-sm-001',
    pattern: '〜くないです / 〜くなかったです',
    levels: ['N5'],
    meaning: 'Is not / Was not (I-adjective negative and past negative)',
    formula: 'い-Adj (remove い) + くないです / くなかったです (or くありません / くありませんでした)',
    explanation: 'Conjugates i-adjectives into polite negative and past negative forms. Note that いい (good) conjugates irregularly as よくないです / よかったです / よくなかったです.',
    nuance: 'Standard polite predicate form for i-adjectives.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 1', notes: 'えいがは おもしろくなかったです' }
    ],
    examples: [
      {
        ja: '昨日の映画は面白くなかったです。',
        furigana: '昨日[きのう]の 映画[えいが]は 面白[おもしろ]くなかったです。',
        en: 'Yesterday\'s movie was not interesting.'
      },
      {
        ja: 'コンサートはとてもよかったです。',
        furigana: 'コンサートは とても よかったです。',
        en: 'The concert was very good.'
      }
    ]
  },
  {
    id: 'g-n5-sm-002',
    pattern: '〜じゃないです / 〜じゃなかったです',
    levels: ['N5'],
    meaning: 'Is not / Was not (Na-adjective & Noun negative and past negative)',
    formula: 'な-Adj stem / Noun + ではないです / じゃないです / じゃありませんでした',
    explanation: 'Conjugates na-adjectives and nouns into polite negative and past negative forms. では can be contracted to じゃ in spoken Japanese.',
    nuance: 'Polite negation and past negation for nouns and na-adjectives.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 1', notes: 'えいがは おもしろくなかったです' }
    ],
    examples: [
      {
        ja: '私の部屋はきれいではありません。',
        furigana: '私[わたし]の 部屋[へや]は きれいではありません。',
        en: 'My room is not clean.'
      },
      {
        ja: '昨日は暇じゃなかったです。',
        furigana: '昨日[きのう]は 暇[ひま]じゃなかったです。',
        en: 'I wasn\'t free yesterday.'
      }
    ]
  },
  {
    id: 'g-n5-sm-003',
    pattern: '〜があります / 〜がいます',
    levels: ['N5'],
    meaning: 'There is / have (Inanimate vs Animate existence)',
    formula: '[Inanimate Object] が あります / [Person / Animal] が います',
    explanation: 'あります expresses the existence or possession of non-living things, plants, or events. います expresses the existence or presence of living people and animals.',
    nuance: 'Essential distinction between living beings (います) and inanimate objects (あります).',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 2', notes: 'きょうだいが いますか' }
    ],
    examples: [
      {
        ja: '机の上に本があります。',
        furigana: '机[つくえ]の 上[うえ]に 本[ほん]が あります。',
        en: 'There is a book on the desk.'
      },
      {
        ja: '庭にかわいい猫がいます。',
        furigana: '庭[にわ]に かわいい 猫[ねこ]が います。',
        en: 'There is a cute cat in the garden.'
      }
    ]
  },
  {
    id: 'g-n5-sm-004',
    pattern: '[場所] に 〜があります / います',
    levels: ['N5'],
    meaning: 'There is [something/someone] in/at [location]',
    formula: 'Location + に + Subject + が + あります / います',
    explanation: 'Indicates the existence of an object or person at a specific physical location marked by the particle に.',
    nuance: 'Focuses on what exists at a specific location.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 2', notes: 'きょうだいが いますか' }
    ],
    examples: [
      {
        ja: '教室に田中先生がいます。',
        furigana: '教室[きょうしつ]に 田中[たなか] 先生[せんせい]が います。',
        en: 'Professor Tanaka is in the classroom.'
      },
      {
        ja: '公園に大きな木があります。',
        furigana: '公園[こうえん]に 大[おお]きな 木[き]が あります。',
        en: 'There is a big tree in the park.'
      }
    ]
  },
  {
    id: 'g-n5-sm-005',
    pattern: '形容詞 ＋ 名詞 / 名詞 ＋ の ＋ 名詞',
    levels: ['N5'],
    meaning: 'Adjective modifying noun / Noun modifying noun',
    formula: 'い-Adj + Noun / な-Adj + な + Noun / Noun 1 + の + Noun 2',
    explanation: 'I-adjectives directly connect to nouns. Na-adjectives require な before nouns. Nouns require の when modifying other nouns.',
    nuance: 'Direct noun modification.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 2', notes: 'きょうだいが いますか' }
    ],
    examples: [
      {
        ja: 'きれいな花と大きい車を買いました。',
        furigana: 'きれいな 花[はな]と 大[おお]きい 車[くるま]を 買[か]いました。',
        en: 'I bought pretty flowers and a big car.'
      },
      {
        ja: '日本の車と昨日の新聞です。',
        furigana: '日本[にほん]の 車[くるま]と 昨日[きのう]の 新聞[しんぶん]です。',
        en: 'These are a Japanese car and yesterday\'s newspaper.'
      }
    ]
  },
  {
    id: 'g-n5-sm-006',
    pattern: '〜の [代名詞的用法]',
    levels: ['N5'],
    meaning: 'The one of / \'s (Noun replacement pronoun)',
    formula: 'Noun / Adjective + の',
    explanation: 'The particle の can stand in place of an already understood noun to mean \'one\' or \'possessor\'s one\'.',
    nuance: 'Avoids repeating obvious nouns in conversation.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 2', notes: 'きょうだいが いますか' }
    ],
    examples: [
      {
        ja: 'A:「これは誰の傘ですか。」 B:「私のです。」',
        furigana: 'A:「これは 誰[だれ]の 傘[かさ]ですか。」 B:「私[わたし]のです。」',
        en: 'A: \'Whose umbrella is this?\' B: \'It is mine.\''
      },
      {
        ja: '大きいカバンと青いのが好きです。',
        furigana: '大[おお]きい カバンと 青[あお]いのが 好[す]きです。',
        en: 'I like the big bag and the blue one.'
      }
    ]
  },
  {
    id: 'g-n5-sm-007',
    pattern: 'N は',
    levels: ['N5'],
    meaning: 'Topic marker / Contrast marker',
    formula: 'Noun + は (pronounced wa)',
    explanation: 'Marks the general topic of the sentence. It can also be used to contrast two elements (e.g. \'I eat meat, but I don\'t eat fish\').',
    nuance: 'Topic introduction or deliberate contrast.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 3', notes: 'あには せが 高いです' }
    ],
    examples: [
      {
        ja: '私はカナダから来ました。',
        furigana: '私[わたし]は カナダから 来[き]ました。',
        en: 'I came from Canada.'
      },
      {
        ja: '肉は食べますが、魚は食べません。',
        furigana: '肉[にく]は 食[た]べますが、 魚[さかな]は 食[た]べません。',
        en: 'I eat meat, but I do not eat fish.'
      }
    ]
  },
  {
    id: 'g-n5-sm-008',
    pattern: 'A は B が [形容詞] です',
    levels: ['N5'],
    meaning: 'As for A, B is [adjective] (Attribute description)',
    formula: 'Noun A + は + Noun B + が + Adjective + です',
    explanation: 'Used to describe a feature, body part, ability, or characteristic B of subject A.',
    nuance: 'Natural pattern for descriptions like height, eyes, skills, and desires.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 3', notes: 'あには せが 高いです' }
    ],
    examples: [
      {
        ja: '兄は背が高いです。',
        furigana: '兄[あに]は 背[せ]が 高[たか]いです。',
        en: 'My older brother is tall.'
      },
      {
        ja: '東京は人が多いです。',
        furigana: '東京[とうきょう]は 人[ひと]が 多[おお]いです。',
        en: 'Tokyo has many people.'
      }
    ]
  },
  {
    id: 'g-n5-sm-009',
    pattern: '疑問詞 ＋ が',
    levels: ['N5'],
    meaning: 'Interrogative subject marker (Who/Which/What did it)',
    formula: 'Question Word (だれ / どれ / なに / どこ) + が + Verb / Adjective',
    explanation: 'When the subject of a clause is a question word, the particle が must be used instead of は. The answer also uses が.',
    nuance: 'Specific identification of unknown subject.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 3', notes: 'あには せが 高いです' }
    ],
    examples: [
      {
        ja: 'A:「誰が来ましたか。」 B:「田中さんが来ました。」',
        furigana: 'A:「誰[だれ]が 来[き]ましたか。」 B:「田中[たなか]さんが 来[き]ました。」',
        en: 'A: \'Who came?\' B: \'Mr. Tanaka came.\''
      },
      {
        ja: 'どれが田中さんのコップですか。',
        furigana: 'どれが 田中[たなか]さんの コップですか。',
        en: 'Which one is Mr. Tanaka\'s cup?'
      }
    ]
  },
  {
    id: 'g-n5-sm-010',
    pattern: 'N を [移動・離脱]',
    levels: ['N5'],
    meaning: 'Through / Along / Leaving [space or vehicle]',
    formula: 'Place / Vehicle + を + Motion Verb (散歩する / 渡る / 出る / 降りる)',
    explanation: 'The particle を marks the space along which movement takes place or the place/vehicle from which one departs.',
    nuance: 'Path of motion or point of departure.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 3', notes: 'あには せが 高いです' }
    ],
    examples: [
      {
        ja: '毎朝公園を散歩します。',
        furigana: '毎朝[まいあさ] 公園[こうえん]を 散歩[さんぽ]します。',
        en: 'I take a walk through the park every morning.'
      },
      {
        ja: '朝7時に家を出て、駅で電車を降ります。',
        furigana: '朝[あさ] 7時[しちじ]に 家[いえ]を 出[で]て、 駅[えき]で 電車[でんしゃ]を 降[お]ります。',
        en: 'I leave my house at 7:00 AM and get off the train at the station.'
      }
    ]
  },
  {
    id: 'g-n5-sm-011',
    pattern: 'N で [場所・手段・道具・言語]',
    levels: ['N5'],
    meaning: 'At (action location) / By means of / In (language)',
    formula: 'Place / Tool / Means / Language + で + Action Verb',
    explanation: 'で indicates where an active event takes place, the vehicle/method of transportation, the tool used, or the language spoken.',
    nuance: 'Location of activity or medium of action.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 4', notes: 'しゅくだいは いえで しましょう' }
    ],
    examples: [
      {
        ja: '図書館で勉強して、バスで家に帰りました。',
        furigana: '図書館[としょかん]で 勉強[べんきょう]して、 バスで 家[いえ]に 帰[かえ]りました。',
        en: 'I studied at the library and returned home by bus.'
      },
      {
        ja: '日本語で手紙を書きました。',
        furigana: '日本語[にほんご]で 手紙[てがみ]を 書[か]きました。',
        en: 'I wrote a letter in Japanese.'
      }
    ]
  },
  {
    id: 'g-n5-sm-012',
    pattern: 'N に [時間・目的地・帰着点]',
    levels: ['N5'],
    meaning: 'At (time) / To (destination) / On (target)',
    formula: 'Time / Destination / Person + に + Verb',
    explanation: 'に indicates the specific point in time an action occurs, the destination of a motion verb, or the receiver/target of an action.',
    nuance: 'Specific pinpoint in time, space, or recipient.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 4', notes: 'しゅくだいは いえで しましょう' }
    ],
    examples: [
      {
        ja: '朝6時に起きて、学校に行きます。',
        furigana: '朝[あさ] 6時[ろくじ]に 起[お]きて、 学校[がっこう]に 行[い]きます。',
        en: 'I wake up at 6:00 in the morning and go to school.'
      },
      {
        ja: '友達にプレゼントを渡しました。',
        furigana: '友達[ともだち]に プレゼントを 渡[わた]しました。',
        en: 'I handed the present to my friend.'
      }
    ]
  },
  {
    id: 'g-n5-sm-013',
    pattern: 'N1 から N2 まで',
    levels: ['N5'],
    meaning: 'From N1 to N2 (Time or Place range)',
    formula: 'Time/Place 1 + から + Time/Place 2 + まで',
    explanation: 'Indicates the starting point (から) and ending point (まで) of time, space, or distance.',
    nuance: 'Covers a complete span or duration.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 5', notes: 'ここまで あるいて 来ました' }
    ],
    examples: [
      {
        ja: '会社は朝9時から夕方5時までです。',
        furigana: '会社[かいしゃ]は 朝[あさ] 9時[くじ]から 夕方[ゆうがた] 5時[ごじ]までです。',
        en: 'Work is from 9:00 AM to 5:00 PM.'
      },
      {
        ja: '東京から京都まで新幹線で行きました。',
        furigana: '東京[とうきょう]から 京都[きょうと]まで 新幹線[しんかんせん]で 行[い]きました。',
        en: 'I went from Tokyo to Kyoto by Shinkansen.'
      }
    ]
  },
  {
    id: 'g-n5-sm-014',
    pattern: 'N1 や N2 (など)',
    levels: ['N5'],
    meaning: 'N1 and N2 (among other things / non-exhaustive list)',
    formula: 'Noun 1 + や + Noun 2 + (など)',
    explanation: 'Lists nouns as representative examples, implying there are other items in the group not explicitly stated.',
    nuance: 'Incomplete enumeration, unlike と which lists all items.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 5', notes: 'ここまで あるいて 来ました' }
    ],
    examples: [
      {
        ja: '机の上に本やノートなどがあります。',
        furigana: '机[つくえ]の 上[うえ]に 本[ほん]や ノートなどが あります。',
        en: 'There are books, notebooks, and other things on the desk.'
      }
    ]
  },
  {
    id: 'g-n5-sm-015',
    pattern: 'N1 か N2',
    levels: ['N5'],
    meaning: 'N1 or N2 (Choice / Alternative)',
    formula: 'Noun 1 + か + Noun 2',
    explanation: 'Connects two alternatives, meaning \'either N1 or N2\'.',
    nuance: 'Expresses an option between two choices.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 5', notes: 'ここまで あるいて 来ました' }
    ],
    examples: [
      {
        ja: 'コーヒーか紅茶はいかがですか。',
        furigana: 'コーヒーか 紅茶[こうちゃ]は いかがですか。',
        en: 'Would you like coffee or black tea?'
      }
    ]
  },
  {
    id: 'g-n5-sm-016',
    pattern: 'N くらい / ぐらい',
    levels: ['N5'],
    meaning: 'About, approximately (Quantity / Duration)',
    formula: 'Quantity / Time duration + くらい / ぐらい',
    explanation: 'Attaches to numbers, counters, or time words to express an approximation.',
    nuance: 'Approximate estimate of amount or time.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 5', notes: 'ここまで あるいて 来ました' }
    ],
    examples: [
      {
        ja: '駅から家まで20分くらいかかります。',
        furigana: '駅[えき]から 家[いえ]まで 20分[にじゅっぷん]くらい かかります。',
        en: 'It takes about 20 minutes from the station to the house.'
      }
    ]
  },
  {
    id: 'g-n5-sm-017',
    pattern: 'N だけ',
    levels: ['N5'],
    meaning: 'Only, just N',
    formula: 'Noun / Counter + だけ',
    explanation: 'Restricts the statement to only the specified noun or amount, excluding all others.',
    nuance: 'Clear boundary meaning \'nothing else\'.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 5', notes: 'ここまで あるいて 来ました' }
    ],
    examples: [
      {
        ja: 'リンゴを1つだけ買いました。',
        furigana: 'リンゴを 1つだけ 買[か]いました。',
        en: 'I bought only one apple.'
      }
    ]
  },
  {
    id: 'g-n5-sm-018',
    pattern: 'N ごろ',
    levels: ['N5'],
    meaning: 'Around (a point in time)',
    formula: 'Specific Clock Time / Month / Season + ごろ',
    explanation: 'Used with specific points in time (not durations) to mean \'around that time\'.',
    nuance: 'Approximate point in time (contrast with ぐらい which indicates duration).',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 3 Day 5', notes: 'ここまで あるいて 来ました' }
    ],
    examples: [
      {
        ja: '今夜8時ごろ電話します。',
        furigana: '今夜[こんや] 8時[はちじ]ごろ 電話[でんわ]します。',
        en: 'I will call around 8:00 tonight.'
      }
    ]
  },
  {
    id: 'g-n5-sm-019',
    pattern: 'だれか / なにか / どこか',
    levels: ['N5'],
    meaning: 'Someone / Something / Somewhere (Indefinite)',
    formula: 'だれか (someone) / なにか (something) / どこか (somewhere)',
    explanation: 'Formed by adding か to question words to express an unspecified person, object, or location without asking a question.',
    nuance: 'Non-specific positive presence.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 1', notes: 'コーヒーは いかがですか' }
    ],
    examples: [
      {
        ja: '休日にどこかへ行きましたか。',
        furigana: '休日[きゅうじつ]に どこかへ 行[い]きましたか。',
        en: 'Did you go somewhere on the holiday?'
      },
      {
        ja: '喉が渇いたので何か冷たいものを飲みたいです。',
        furigana: '喉[のど]が 渇[かわ]いたので 何[なに]か 冷[つめ]たいものを 飲[の]みたいです。',
        en: 'I am thirsty so I want to drink something cold.'
      }
    ]
  },
  {
    id: 'g-n5-sm-020',
    pattern: 'だれも〜ない / なにも〜ない / どこ[へ/に]も〜ない',
    levels: ['N5'],
    meaning: 'Nobody / Nothing / Nowhere (Complete negation)',
    formula: 'Question Word + も + Negative Verb',
    explanation: 'Formed by adding も to question words with a negative verb to express total absence or non-existence.',
    nuance: 'Comprehensive negation.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 1', notes: 'コーヒーは いかがですか' }
    ],
    examples: [
      {
        ja: '部屋には誰もいませんでした。',
        furigana: '部屋[へや]には 誰[だれ]も いませんでした。',
        en: 'There was nobody in the room.'
      },
      {
        ja: '昨日はどこへも行きませんでした。',
        furigana: '昨日[きのう]は どこへも 行[い]きませんでした。',
        en: 'I didn\'t go anywhere yesterday.'
      }
    ]
  },
  {
    id: 'g-n5-sm-021',
    pattern: 'だれでも / なんでも / どこでも',
    levels: ['N5'],
    meaning: 'Anybody / Anything / Anywhere (Complete inclusion)',
    formula: 'Question Word + でも + Positive Verb',
    explanation: 'Expresses that anyone, anything, anywhere, or anytime is acceptable without restriction.',
    nuance: 'Universal inclusion / open option.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 1', notes: 'コーヒーは いかがですか' }
    ],
    examples: [
      {
        ja: 'この問題は簡単ですから誰でもわかります。',
        furigana: 'この 問題[もんだい]は 簡単[かんたん]ですから 誰[だれ]でも わかります。',
        en: 'This problem is easy, so anyone can understand it.'
      },
      {
        ja: '何でも好きなものを食べてください。',
        furigana: '何[なん]でも 好[す]きなものを 食[た]べてください。',
        en: 'Please eat whatever you like.'
      }
    ]
  },
  {
    id: 'g-n5-sm-022',
    pattern: 'Vて [動作の連続・並列]',
    levels: ['N5'],
    meaning: 'Do V and then / And (Sequence of actions)',
    formula: 'Verb (て-form) + Verb 2',
    explanation: 'Connects sequential actions in chronological order, meaning \'do action 1, and then do action 2\'.',
    nuance: 'Natural chronological progression.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 2', notes: '先生は きれいで、やさしいです' }
    ],
    examples: [
      {
        ja: '朝起きて、シャワーを浴びて、朝ご飯を食べます。',
        furigana: '朝[あさ] 起[お]きて、 シャワーを 浴[あ]びて、 朝[あさ] ご飯[はん]を 食[た]べます。',
        en: 'I wake up in the morning, take a shower, and eat breakfast.'
      }
    ]
  },
  {
    id: 'g-n5-sm-023',
    pattern: 'Vてから',
    levels: ['N5'],
    meaning: 'After doing V (Strict sequential prerequisite)',
    formula: 'Verb (て-form) + から',
    explanation: 'Emphasizes that action 2 occurs only after action 1 has completely finished.',
    nuance: 'Clear condition of sequence (\'only after V1 is done\').',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 2', notes: '先生は きれいで、やさしいです' }
    ],
    examples: [
      {
        ja: '手を洗ってからご飯を食べましょう。',
        furigana: '手[て]を 洗[あら]ってから ご飯[はん]を 食[た]べましょう。',
        en: 'Let\'s eat after washing our hands.'
      }
    ]
  },
  {
    id: 'g-n5-sm-024',
    pattern: 'i-Aくて / na-Aで / Nで [並列]',
    levels: ['N5'],
    meaning: 'And / Being (Connecting adjectives and nouns)',
    formula: 'い-Adj (drop い) + くて / な-Adj stem + で / Noun + で',
    explanation: 'Connects multiple adjectives or nouns describing the same subject into a single unified sentence.',
    nuance: 'Smooth sentence combination.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 2', notes: '先生は きれいで、やさしいです' }
    ],
    examples: [
      {
        ja: 'この店の料理は安くておいしいです。',
        furigana: 'この 店[みせ]の 料理[りょうり]は 安[やす]くて おいしいです。',
        en: 'The food at this restaurant is cheap and delicious.'
      },
      {
        ja: '田中先生は親切で優しいです。',
        furigana: '田中[たなか] 先生[せんせい]は 親切[しんせつ]で 優[やさ]しいです。',
        en: 'Professor Tanaka is kind and gentle.'
      }
    ]
  },
  {
    id: 'g-n5-sm-025',
    pattern: '〜てください',
    levels: ['N5'],
    meaning: 'Please do (Polite request)',
    formula: 'Verb (て-form) + ください',
    explanation: 'Used to politely ask or instruct someone to perform an action.',
    nuance: 'Standard polite instruction in daily life and classrooms.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 3', notes: 'しゅくだいを わすれないで ください' }
    ],
    examples: [
      {
        ja: 'ここに名前と住所を書いてください。',
        furigana: 'ここに 名前[なまえ]と 住所[じゅうしょ]を 書[か]いてください。',
        en: 'Please write your name and address here.'
      }
    ]
  },
  {
    id: 'g-n5-sm-026',
    pattern: '〜ないでください',
    levels: ['N5'],
    meaning: 'Please do not do (Polite negative request / prohibition)',
    formula: 'Verb (ない-form) + でください',
    explanation: 'Politely requests or instructs someone to refrain from doing an action.',
    nuance: 'Gentle prohibition or request to avoid an action.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 3', notes: 'しゅくだいを わすれないで ください' }
    ],
    examples: [
      {
        ja: '教室で写真を撮らないでください。',
        furigana: '教室[きょうしつ]で 写真[しゃしん]を 撮[と]らないでください。',
        en: 'Please do not take photos in the classroom.'
      },
      {
        ja: '宿題を忘れないでください。',
        furigana: '宿題[しゅくだい]を 忘[わす]れないでください。',
        en: 'Please do not forget your homework.'
      }
    ]
  },
  {
    id: 'g-n5-sm-027',
    pattern: '〜ています [進行・結果の状態]',
    levels: ['N5'],
    meaning: 'Is currently doing / Continuous state',
    formula: 'Verb (て-form) + います',
    explanation: 'Indicates an action currently in progress (e.g. reading a book) or the ongoing result of a past change of state (e.g. being married, living in Tokyo, knowing someone).',
    nuance: 'Progressive action or enduring resultant state.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 3', notes: 'しゅくだいを わすれないで ください' }
    ],
    examples: [
      {
        ja: '今、日本語の教科書を読んでいます。',
        furigana: '今[いま]、 日本語[にほんご]の 教科書[きょうかしょ]を 読[よ]んでいます。',
        en: 'I am currently reading a Japanese textbook.'
      },
      {
        ja: '兄は東京に住んでいます。',
        furigana: '兄[あに]は 東京[とうきょう]に 住[す]んでいます。',
        en: 'My older brother lives in Tokyo.'
      }
    ]
  },
  {
    id: 'g-n5-sm-028',
    pattern: '〜たいです',
    levels: ['N5'],
    meaning: 'Want to do (Personal desire)',
    formula: 'Verb (ます stem) + たいです',
    explanation: 'Expresses the speaker\'s personal desire to do an activity. In questions, it asks about the listener\'s desire.',
    nuance: 'First-person wish. (To talk about a third person\'s desire, 〜たがっています is used).',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 3', notes: 'しゅくだいを わすれないで ください' }
    ],
    examples: [
      {
        ja: '来年、富士山に登りたいです。',
        furigana: '来年[らいねん]、 富士山[ふじさん]に 登[のぼ]りたいです。',
        en: 'I want to climb Mount Fuji next year.'
      }
    ]
  },
  {
    id: 'g-n5-sm-029',
    pattern: 'N が ほしいです',
    levels: ['N5'],
    meaning: 'Want N (Desire for an object)',
    formula: 'Noun + が + ほしいです',
    explanation: 'Expresses the speaker\'s desire to possess a concrete object or item.',
    nuance: 'First-person desire for a noun.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 3', notes: 'しゅくだいを わすれないで ください' }
    ],
    examples: [
      {
        ja: '誕生日に新しいカメラがほしいです。',
        furigana: '誕生日[たんじょうび]に 新[あたら]しい カメラが ほしいです。',
        en: 'I want a new camera for my birthday.'
      }
    ]
  },
  {
    id: 'g-n5-sm-030',
    pattern: '〜ましょう / 〜ましょうか',
    levels: ['N5'],
    meaning: 'Let\'s do / Shall we? / Shall I help?',
    formula: 'Verb (ます stem) + ましょう / ましょうか',
    explanation: '〜ましょう proposes an action together (\'let\'s\'). 〜ましょうか asks for agreement or offers help to the listener (\'shall I / shall we?\').',
    nuance: 'Enthusiastic proposal or helpful offer.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 4', notes: 'こうえんを さんぽしませんか' }
    ],
    examples: [
      {
        ja: '疲れたので少し休みましょう。',
        furigana: '疲[つか]れたので 少し[すこし] 休[やす]みましょう。',
        en: 'We are tired, so let\'s rest a little.'
      },
      {
        ja: '荷物を持ちましょうか。',
        furigana: '荷物[にもつ]を 持[も]ちましょうか。',
        en: 'Shall I carry your baggage?'
      }
    ]
  },
  {
    id: 'g-n5-sm-031',
    pattern: '〜ませんか',
    levels: ['N5'],
    meaning: 'Won\'t you? / Shall we? (Polite invitation)',
    formula: 'Verb (ます stem) + ませんか',
    explanation: 'Used to politely invite someone to do an activity together, giving them an easy way to decline if they wish.',
    nuance: 'Gentle, polite invitation.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 4', notes: 'こうえんを さんぽしませんか' }
    ],
    examples: [
      {
        ja: '一緒に公園を散歩しませんか。',
        furigana: '一緒[いっしょ]に 公園[こうえん]を 散歩[さんぽ]しませんか。',
        en: 'Would you like to take a walk in the park together?'
      }
    ]
  },
  {
    id: 'g-n5-sm-032',
    pattern: '〜にあげます / 〜からもらいます / 〜がくれます',
    levels: ['N5'],
    meaning: 'Give to / Receive from / Give to me (Giving & Receiving)',
    formula: '[Giver] は [Receiver] に あげます / [Receiver] は [Giver] に/から もらいます / [Giver] は [Me] に くれます',
    explanation: 'あげます is giving to others. もらいます is receiving from someone. くれます is someone giving something to the speaker or speaker\'s in-group.',
    nuance: 'Core Japanese giving and receiving dynamic based on perspective.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 4', notes: 'こうえんを さんぽしませんか' }
    ],
    examples: [
      {
        ja: '友達に誕生日プレゼントをあげました。',
        furigana: '友達[ともだち]に 誕生日[たんじょうび] プレゼントを あげました。',
        en: 'I gave a birthday present to my friend.'
      },
      {
        ja: '先生から素敵な本をもらいました。',
        furigana: '先生[せんせい]から 素敵[すてき]な 本[ほん]を もらいました。',
        en: 'I received a wonderful book from my teacher.'
      },
      {
        ja: '母がおいしいお菓子をくれました。',
        furigana: '母[はは]が おいしい お 菓子[かし]を くれました。',
        en: 'My mother gave me delicious snacks.'
      }
    ]
  },
  {
    id: 'g-n5-sm-033',
    pattern: '[文(普通形)] ＋ 名詞',
    levels: ['N5'],
    meaning: 'Noun modification by relative clause (The noun that ...)',
    formula: 'Clause (Plain / Short form) + Noun',
    explanation: 'In Japanese, a modifying sentence is placed directly before the noun it describes, with verbs in the plain (dictionary, た, ない) form.',
    nuance: 'Relative clauses in Japanese always precede the modified noun.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 5', notes: 'これは 友だちに もらった CDです' }
    ],
    examples: [
      {
        ja: 'これは友達にもらったCDです。',
        furigana: 'これは 友達[ともだち]に もらった CDです。',
        en: 'This is the CD that I received from my friend.'
      },
      {
        ja: '昨日買った本はとても面白かったです。',
        furigana: '昨日[きのう] 買[か]った 本[ほん]は とても 面白[おもしろ]かったです。',
        en: 'The book I bought yesterday was very interesting.'
      }
    ]
  },
  {
    id: 'g-n5-sm-034',
    pattern: '〜から [理由] / 〜からです',
    levels: ['N5'],
    meaning: 'Because, since / It is because ...',
    formula: 'Clause 1 + から, Clause 2 / [Result] です。[Reason] からです。',
    explanation: 'から marks the reason or cause for the resulting clause or conclusion.',
    nuance: 'Direct causal relationship.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 6', notes: '高いから 買いません' }
    ],
    examples: [
      {
        ja: '高いから買いません。',
        furigana: '高[たか]いから 買[か]いません。',
        en: 'Because it is expensive, I won\'t buy it.'
      },
      {
        ja: '傘を持っていきます。雨が降っているからです。',
        furigana: '傘[かさ]を 持[も]っていきます。 雨[あめ]が 降[ふ]っているからです。',
        en: 'I will take an umbrella. It is because it is raining.'
      }
    ]
  },
  {
    id: 'g-n5-sm-035',
    pattern: '〜けれど(も) / 〜が / しかし',
    levels: ['N5'],
    meaning: 'Although, but, however (Contrast / Disjunction)',
    formula: 'Clause 1 + けれど(も) / が, Clause 2 / Sentence 1。しかし、Sentence 2。',
    explanation: 'Connects two contrasting statements. が and けれど can connect clauses within a sentence; しかし is used at the start of a new sentence.',
    nuance: 'Polite contrast or contradiction.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 6', notes: '高いから 買いません' }
    ],
    examples: [
      {
        ja: '日本料理はおいしいですが、少し高いです。',
        furigana: '日本料理[にほんりょうり]は おいしいですが、 少し[すこし] 高[たか]いです。',
        en: 'Japanese food is delicious, but it is a bit expensive.'
      },
      {
        ja: '一生懸命勉強しました。しかし、合格できませんでした。',
        furigana: '一生懸命[いっしょうけんめい] 勉強[べんきょう]しました。 しかし、 合格[ごうかく]できませんでした。',
        en: 'I studied hard. However, I could not pass.'
      }
    ]
  },
  {
    id: 'g-n5-sm-036',
    pattern: 'だから',
    levels: ['N5'],
    meaning: 'Therefore, so, that is why',
    formula: 'Sentence 1。だから / ですから、Sentence 2。',
    explanation: 'Conjunction starting a new sentence to explain that Sentence 2 is the natural result of Sentence 1.',
    nuance: 'Sentence-initial causal transition.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 4 Day 6', notes: '高いから 買いません' }
    ],
    examples: [
      {
        ja: '明日は日曜日です。だから、学校は休みです。',
        furigana: '明日[あした]は 日曜日[にちようび]です。 だから、 学校[がっこう]は 休[やす]みです。',
        en: 'Tomorrow is Sunday. Therefore, school is closed.'
      }
    ]
  },
  {
    id: 'g-n5-sm-037',
    pattern: '程度副詞 (とても / 少し / あまり〜ない / 全然〜ない)',
    levels: ['N5'],
    meaning: 'Degree adverbs (Very / A little / Not very / Not at all)',
    formula: 'とても / すこし + Positive Predicate / あまり / ぜんぜん + Negative Predicate',
    explanation: 'Modifiers expressing the degree of an adjective or action. とても and 少し are used with positive sentences; あまり and 全然 must be paired with negative predicates.',
    nuance: 'Precise expression of degree and intensity.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 1', notes: 'それは たいへんですね' }
    ],
    examples: [
      {
        ja: 'この本はとても面白いです。',
        furigana: 'この 本[ほん]は とても 面白[おもしろ]いです。',
        en: 'This book is very interesting.'
      },
      {
        ja: '昨日は全然寝られませんでした。',
        furigana: '昨日[きのう]は 全然[ぜんぜん] 寝[ね]られませんでした。',
        en: 'I could not sleep at all yesterday.'
      }
    ]
  },
  {
    id: 'g-n5-sm-038',
    pattern: 'まだ 〜ていません',
    levels: ['N5'],
    meaning: 'Have not yet done V',
    formula: 'まだ + Verb (て-form) + いません',
    explanation: 'Expresses that an anticipated action has not been performed up to the present moment.',
    nuance: 'Contrasts with もう〜ました (\'already done\').',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 2', notes: 'まだ しゅくだいを していません' }
    ],
    examples: [
      {
        ja: '宿題はまだ終わっていません。',
        furigana: '宿題[しゅくだい]は まだ 終[お]わっていません。',
        en: 'I have not finished my homework yet.'
      },
      {
        ja: '昼ご飯はまだ食べていません。',
        furigana: '昼[ひる] ご飯[はん]は まだ 食[た]べていません。',
        en: 'I haven\'t eaten lunch yet.'
      }
    ]
  },
  {
    id: 'g-n5-sm-039',
    pattern: 'i-Aくなります / na-A・Nになります',
    levels: ['N5'],
    meaning: 'Become, get (Natural change of state)',
    formula: 'い-Adj (remove い) + くなります / な-Adj stem + になります / Noun + になります',
    explanation: 'Expresses a natural transformation or spontaneous change into a new state or condition.',
    nuance: 'Natural, automatic change without focusing on human intervention.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 3', notes: 'あさは 早く おきましょう' }
    ],
    examples: [
      {
        ja: '寒くなってきましたね。',
        furigana: '寒[さむ]くなってきましたね。',
        en: 'It has become cold, hasn\'t it?'
      },
      {
        ja: '将来、日本語の先生になりたいです。',
        furigana: '将来[しょうらい]、 日本語[にほんご]の 先生[せんせい]に なりたいです。',
        en: 'I want to become a Japanese language teacher in the future.'
      }
    ]
  },
  {
    id: 'g-n5-sm-040',
    pattern: 'i-Aくします / na-A・Nにします',
    levels: ['N5'],
    meaning: 'Make something ... / Decide on (Intentional change / Choice)',
    formula: 'い-Adj (remove い) + くします / な-Adj stem + にします / Noun + にします',
    explanation: 'Expresses intentional action to alter a state (e.g. lowering the volume, cleaning a room) or deciding on an option from a menu.',
    nuance: 'Intentional human modification or personal choice.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 3', notes: 'あさは 早く おきましょう' }
    ],
    examples: [
      {
        ja: 'テレビの音を小さくしてください。',
        furigana: 'テレビの 音[おと]を 小[ちい]さくしてください。',
        en: 'Please turn down the volume of the TV.'
      },
      {
        ja: '私はコーヒーにします。',
        furigana: '私[わたし]は コーヒーに します。',
        en: 'I will have coffee (decision).'
      }
    ]
  },
  {
    id: 'g-n5-sm-041',
    pattern: 'i-Aく ＋ V / na-Aに ＋ V [連用修飾]',
    levels: ['N5'],
    meaning: 'Adverbial modifier (Do action in [manner])',
    formula: 'い-Adj (remove い) + く + Verb / な-Adj stem + に + Verb',
    explanation: 'Turns an adjective into an adverb describing the manner in which a verb is performed.',
    nuance: 'Manner of action.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 3', notes: 'あさは 早く おきましょう' }
    ],
    examples: [
      {
        ja: '明日の朝は早く起きましょう。',
        furigana: '明日[あした]の 朝[あさ]は 早[はや]く 起[お]きましょう。',
        en: 'Let\'s wake up early tomorrow morning.'
      },
      {
        ja: '上手に日本語で歌いました。',
        furigana: '上手[じょうず]に 日本語[にほんご]で 歌[うた]いました。',
        en: 'She sang skillfully in Japanese.'
      }
    ]
  },
  {
    id: 'g-n5-sm-042',
    pattern: '〜とき (Vる時 / Vた時 / Nの時 / Adj時)',
    levels: ['N5'],
    meaning: 'When, at the time of',
    formula: 'Verb (Dictionary / た form) + とき / Noun + の + とき / い-Adj + とき / な-Adj + な + とき',
    explanation: 'Marks the time or circumstance when another action or state takes place.',
    nuance: 'Temporal condition or setting.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 4', notes: 'ひまな とき、何を していますか' }
    ],
    examples: [
      {
        ja: '暇なとき、何をしていますか。',
        furigana: '暇[ひま]な とき、 何[なに]を していますか。',
        en: 'What do you do when you are free?'
      },
      {
        ja: '子どものとき、よく川で泳ぎました。',
        furigana: '子[こ]どもの とき、 よく 川[かわ]で 泳[およ]ぎました。',
        en: 'When I was a child, I often swam in the river.'
      }
    ]
  },
  {
    id: 'g-n5-sm-043',
    pattern: 'Vる前に / Nの前に',
    levels: ['N5'],
    meaning: 'Before doing V / Before N',
    formula: 'Verb (Dictionary form) + 前に / Noun + の前に',
    explanation: 'Indicates that action 2 occurs before action 1 takes place.',
    nuance: 'Preceding sequence.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 4', notes: 'ひまな とき、何を していますか' }
    ],
    examples: [
      {
        ja: '寝る前に歯を磨きます。',
        furigana: '寝[ね]る 前[まえ]に 歯[は]を 磨[みが]きます。',
        en: 'I brush my teeth before going to bed.'
      },
      {
        ja: '食事の前に手を洗ってください。',
        furigana: '食事[しょくじ]の 前[まえ]に 手[て]を 洗[あら]ってください。',
        en: 'Please wash your hands before the meal.'
      }
    ]
  },
  {
    id: 'g-n5-sm-044',
    pattern: 'Vた後で / Nの後で',
    levels: ['N5'],
    meaning: 'After doing V / After N',
    formula: 'Verb (た-form) + 後で / Noun + の後で',
    explanation: 'Indicates that action 2 occurs after action 1 has completed.',
    nuance: 'Subsequent sequence.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 4', notes: 'ひまな とき、何を していますか' }
    ],
    examples: [
      {
        ja: 'ご飯を食べた後で、薬を飲みます。',
        furigana: 'ご飯[はん]を 食[た]べた 後[あと]で、 薬[くすり]を 飲[の]みます。',
        en: 'After eating meals, I take medicine.'
      },
      {
        ja: '授業の後で図書館へ行きましょう。',
        furigana: '授業[じゅぎょう]の 後[あと]で 図書館[としょかん]へ 行[い]きましょう。',
        en: 'Let\'s go to the library after class.'
      }
    ]
  },
  {
    id: 'g-n5-sm-045',
    pattern: 'A は B より [形容詞] です',
    levels: ['N5'],
    meaning: 'A is more [adjective] than B (Comparison)',
    formula: 'Noun A + は + Noun B + より + Adjective + です',
    explanation: 'Compares two items, stating that item A has more of the quality than item B.',
    nuance: 'Direct binary comparison.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 5', notes: '母は 父より せが 高いです' }
    ],
    examples: [
      {
        ja: '新幹線はバスより速いです。',
        furigana: '新幹線[しんかんせん]は バスより 速[はや]いです。',
        en: 'The Shinkansen is faster than the bus.'
      },
      {
        ja: '母は父より背が高いです。',
        furigana: '母[はは]は 父[ちち]より 背[せ]が 高[たか]いです。',
        en: 'My mother is taller than my father.'
      }
    ]
  },
  {
    id: 'g-n5-sm-046',
    pattern: 'A と B と どちらが 〜 ですか / Aのほうが 〜 です',
    levels: ['N5'],
    meaning: 'Between A and B, which is more ...? / A is more ...',
    formula: 'Noun A + と + Noun B + と + どちらが + Adj + ですか。 / Noun A + のほうが + Adj + です。',
    explanation: 'Used to ask for and give a comparison between two specific choices.',
    nuance: 'Selecting between two options.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 5', notes: '母は 父より せが 高いです' }
    ],
    examples: [
      {
        ja: 'A:「肉と魚とどちらが好きですか。」 B:「魚のほうが好きです。」',
        furigana: 'A:「肉[にく]と 魚[さかな]と どちらが 好[す]きですか。」 B:「魚[さかな]のほうが 好[す]きです。」',
        en: 'A: \'Between meat and fish, which do you like more?\' B: \'I like fish more.\''
      }
    ]
  },
  {
    id: 'g-n5-sm-047',
    pattern: '[グループ] の 中で [疑問詞] が 一番 [形容詞] ですか',
    levels: ['N5'],
    meaning: 'Among [group], which/who/what is the most ...? (Superlative)',
    formula: '[Group / Category] の中で + Question Word + が + 一番 + Adj + ですか。 / Noun + が一番 + Adj + です。',
    explanation: 'Expresses the superlative comparison among three or more items in a group.',
    nuance: 'Top ranking in a category.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 5', notes: '母は 父より せが 高いです' }
    ],
    examples: [
      {
        ja: '1年の中で春が一番好きです。',
        furigana: '1年[いちねん]の 中[なか]で 春[はる]が 一番[いちばん] 好[す]きです。',
        en: 'Among all seasons in the year, I like spring the best.'
      },
      {
        ja: 'クラスの中で誰が一番背が高いですか。',
        furigana: 'クラスの 中[なか]で 誰[だれ]が 一番[いちばん] 背[せ]が 高[たか]いですか。',
        en: 'Who is the tallest in the class?'
      }
    ]
  },
  {
    id: 'g-n5-sm-048',
    pattern: 'Vること / Vるの [動詞の名詞化]',
    levels: ['N5'],
    meaning: 'Doing V / The act of V (Nominalization)',
    formula: 'Verb (Dictionary form) + こと / の',
    explanation: 'Converts a verb or action clause into a noun phrase so that it can serve as a subject or object in a sentence.',
    nuance: 'Turning actions into concepts/objects of appreciation or difficulty.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 6', notes: 'かんじを 書くのは むずかしいです' }
    ],
    examples: [
      {
        ja: '私の趣味は音楽を聴くことです。',
        furigana: '私[わたし]の 趣味[しゅみ]は 音楽[おんがく]を 聴[き]くことです。',
        en: 'My hobby is listening to music.'
      },
      {
        ja: '漢字を書くのは難しいです。',
        furigana: '漢字[かんじ]を 書[か]くのは 難[むずか]しいです。',
        en: 'Writing kanji is difficult.'
      }
    ]
  },
  {
    id: 'g-n5-sm-049',
    pattern: 'Vることができます / Nができます',
    levels: ['N5'],
    meaning: 'Can do V / Be able to do V (Potential / Capability)',
    formula: 'Verb (Dictionary form) + ことができます / Noun + ができます',
    explanation: 'Expresses ability, skill, or possibility to perform an action.',
    nuance: 'Polite capability or feasibility.',
    sources: [
      { book: 'Nihongo Sou Matome N5', chapter: 'Week 5 Day 6', notes: 'かんじを 書くのは むずかしいです' }
    ],
    examples: [
      {
        ja: '私はピアノを弾くことができます。',
        furigana: '私[わたし]は ピアノを 弾[ひ]くことができます。',
        en: 'I can play the piano.'
      },
      {
        ja: 'このホテルでは英語ができます。',
        furigana: 'この ホテルでは 英語[えいご]が できます。',
        en: 'English can be spoken at this hotel.'
      }
    ]
  }
];

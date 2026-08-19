# NihonHub (日本ハブ) — All-in-One JLPT N5 to N2 Learning Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JLPT Levels](https://img.shields.io/badge/JLPT-N5%20%7C%20N4%20%7C%20N3%20%7C%20N2-crimson.svg)](#jlpt-cumulative-levels)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages%20Ready-brightgreen.svg)](#github-pages-deployment-guide)
[![Modular Structure](https://img.shields.io/badge/Data-Modular%20N5--N2%20Structure-blue.svg)](#folder--data-architecture)

> **NihonHub** is a modern, interactive, and comprehensive single-page web application (SPA) designed to take learners from **JLPT N5 beginner** all the way to **JLPT N2 upper-intermediate fluency**. Built with a **cumulative learning architecture**, higher levels incorporate all foundational material beneath them.

---

## 📂 Folder & Data Architecture

All learning data is segregated cleanly by **Level** (N5 to N2) and **Category** with full textbook/source attribution:

```
Nihon2/
├── index.html                  # Main SPA interface with all 10 learning modules & tabs
├── css/
│   └── style.css               # Design system, glassmorphism, responsive rules & UI styles
├── js/
│   └── app.js                  # Application engine, SRS logic, speech synthesis & state management
├── data/
│   ├── kana.js                 # Hiragana and Katakana master tables
│   ├── quizzes.js              # Mock exam & quiz questions across levels
│   ├── data-loader.js          # Master aggregator, indexer & deduplication engine
│   ├── n5/
│   │   ├── kanji.js            # N5 Kanji with stroke counts, radicals, readings, sources
│   │   ├── vocabulary.js       # N5 Vocab with pitch/romaji, parts of speech, examples
│   │   ├── grammar.js          # N5 Grammar patterns, formulas, nuances, examples
│   │   ├── reading.js          # N5 Reading passages (読解), footnotes, comprehension quiz
│   │   └── listening.js        # N5 Listening dialogues (聴解), scripts, questions
│   ├── n4/
│   │   ├── kanji.js
│   │   ├── vocabulary.js
│   │   ├── grammar.js
│   │   ├── reading.js
│   │   └── listening.js
│   ├── n3/
│   │   ├── kanji.js
│   │   ├── vocabulary.js
│   │   ├── grammar.js
│   │   ├── reading.js
│   │   └── listening.js
│   └── n2/
│       ├── kanji.js
│       ├── vocabulary.js
│       ├── grammar.js
│       ├── reading.js
│       └── listening.js
├── README.md                   # Documentation, level guide & deployment instructions
├── .gitignore                  # Git ignore rules
└── LICENSE                     # MIT License
```

---

## 📖 How to Add Data (Step-by-Step Guide)

You can easily open any file in `data/` and add new items using the standardized schemas below.

### 1. Adding a Kanji (`data/n5/kanji.js`, `data/n4/kanji.js`, etc.)
```javascript
{
  id: 'k-n5-007',
  char: '水',
  meaning: 'Water',
  onyomi: 'スイ',
  kunyomi: 'みず',
  levels: ['N5'], // Can be multiple: ['N5', 'N4']
  strokes: 4,
  radical: '水 (water)',
  sources: [
    { book: 'Nihongo Sou Matome N5', chapter: 'Week 1 Day 2', notes: '' },
    { book: 'Marugoto A1', lesson: 'Lesson 3', notes: '' }
  ],
  examples: [
    { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday', source: 'Sou Matome N5' },
    { word: '冷たい水', reading: 'つめたいみず', meaning: 'Cold water', source: 'Marugoto A1' }
  ]
}
```

### 2. Adding Vocabulary (`data/n5/vocabulary.js`, etc.)
```javascript
{
  id: 'v-n5-006',
  word: '本',
  reading: 'ほん',
  romaji: 'hon',
  meaning: 'Book',
  levels: ['N5'],
  pos: 'Noun',
  sources: [
    { book: 'Minna no Nihongo I', lesson: 'Lesson 2' },
    { book: 'Genki I', lesson: 'Lesson 2' }
  ],
  example: {
    ja: '日本の本を読みます。',
    furigana: '日本[にほん]の 本[ほん]を 読[よ]みます。',
    en: 'I read Japanese books.'
  }
}
```

### 3. Adding Grammar (`data/n5/grammar.js`, etc.)
```javascript
{
  id: 'g-n5-004',
  pattern: '〜てもいいです',
  levels: ['N5'],
  meaning: 'May do, Is it okay to... (Permission)',
  formula: 'Verb (て-form) + もいいです',
  explanation: 'Used to ask for or grant permission.',
  nuance: 'Polite permission.',
  sources: [
    { book: 'Minna no Nihongo I', lesson: 'Lesson 15' },
    { book: 'Genki I', lesson: 'Lesson 6' }
  ],
  examples: [
    {
      ja: '写真を撮ってもいいですか。',
      furigana: '写真[しゃしん]を 撮[と]ってもいいですか。',
      en: 'May I take a photo?'
    }
  ]
}
```

### 4. Adding Reading Passages (`data/n5/reading.js`, etc.)
```javascript
{
  id: 'r-n5-002',
  title: '私の家族 (My Family)',
  levels: ['N5'],
  genre: 'Self-Introduction',
  sources: [{ book: 'Marugoto A1', lesson: 'Lesson 4' }],
  passage: {
    ja: '私の家族は四人です。父と母と兄と私です。',
    furigana: '私[わたし]の 家族[かぞく]は 四人[よにん]です。父[ちち]と 母[はは]と 兄[あに]と 私[わたし]です。',
    en: 'There are four people in my family: my father, mother, older brother, and me.'
  },
  vocabularyNotes: [
    { word: '家族', reading: 'かぞく', meaning: 'Family' },
    { word: '四人', reading: 'よにん', meaning: 'Four people' }
  ],
  questions: [
    {
      question: 'How many people are in the speaker\'s family?',
      options: ['Three', 'Four', 'Five', 'Six'],
      answerIndex: 1,
      explanation: 'The text states: 「私の家族は四人です」 (four people).'
    }
  ]
}
```

### 5. Adding Listening Dialogues (`data/n5/listening.js`, etc.)
```javascript
{
  id: 'l-n5-002',
  title: 'カフェで注文 (Ordering at a Cafe)',
  levels: ['N5'],
  situation: 'Customer ordering a drink at a coffee shop.',
  sources: [{ book: 'Sou Matome N5 Listening', chapter: 'Chapter 1' }],
  dialog: [
    { speaker: 'Staff', text: 'いらっしゃいませ。ご注文はお決まりですか。', furigana: 'いらっしゃいませ。ご 注文[ちゅうもん]は お 決[き]まりですか。' },
    { speaker: 'Customer', text: 'ホットコーヒーを一つください。', furigana: 'ホットコーヒーを 一[ひと]つ ください。' }
  ],
  questions: [
    {
      question: 'What did the customer order?',
      options: ['Iced Tea', 'Hot Coffee', 'Orange Juice', 'Green Tea'],
      answerIndex: 1,
      explanation: 'The customer orders: 「ホットコーヒーを一つください」 (one hot coffee).'
    }
  ]
}
```

---

## 🚀 Interactive Learning Modules

1. **Kanji Matrix**: Stroke counts, radicals, On/Kun readings, compounds, and textbook references.
2. **Vocabulary Vault**: Grouped by part of speech with pitch accents, Romaji, and contextual sentences.
3. **Grammar Guide**: Structural formulas, nuances, and authentic sentences with `<ruby>` Furigana.
4. **Reading Comprehension (読解)**: Passages with toggleable furigana, vocabulary footnotes, and comprehension quizzes.
5. **Listening Practice (聴解)**: Multi-speaker dialogues with Web Speech audio player and comprehension questions.
6. **Interactive SRS Flashcards**: 3D flip card animations with 4-level SRS grading and keyboard shortcuts.
7. **Mock Exams & Quizzes**: Multi-choice exams with 30s countdown timer, instant explanations, and review breakdown.
8. **Native Japanese Speech Synthesis**: Real-time `ja-JP` speech synthesis for all words and sentences.
9. **Furigana & Romaji Toggles**: Global switches for customized reading difficulty.
10. **LocalStorage Progress**: Tracks bookmarks, mastered items, and daily study streaks automatically.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>/</kbd> | Focus global search bar |
| <kbd>Space</kbd> | Flip current flashcard |
| <kbd>&rarr;</kbd> or <kbd>J</kbd> | Next flashcard |
| <kbd>&larr;</kbd> or <kbd>K</kbd> | Previous flashcard |
| <kbd>1</kbd> | Rate flashcard: **Again (Reset)** |
| <kbd>2</kbd> | Rate flashcard: **Hard** |
| <kbd>3</kbd> | Rate flashcard: **Good** |
| <kbd>4</kbd> | Rate flashcard: **Easy (Mastered)** |
| <kbd>Esc</kbd> | Close modal / defocus search |

---

## 🌐 GitHub Pages Deployment Guide

1. **Push your changes to GitHub**:
   ```bash
   git add .
   git commit -m "feat: modularize data across N5-N2 and add reading/listening modules"
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on **GitHub.com** &rarr; **Settings** &rarr; **Pages**.
   - Under **Build and deployment**, select **`Deploy from a branch`**, branch **`main`**, and folder **`/(root)`**.
   - Click **Save**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

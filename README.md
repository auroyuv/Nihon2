# NihonHub (日本ハブ) — All-in-One JLPT N5 to N2 Learning Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JLPT Levels](https://img.shields.io/badge/JLPT-N5%20%7C%20N4%20%7C%20N3%20%7C%20N2-crimson.svg)](#jlpt-cumulative-levels)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages%20Ready-brightgreen.svg)](#github-pages-deployment-guide)
[![Zero Build Step](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%2F%20CSS3%20%2F%20ES6+-blue.svg)](#technology-stack)

> **NihonHub** is a modern, interactive, and comprehensive single-page web application (SPA) designed to take learners from **JLPT N5 beginner** all the way to **JLPT N2 upper-intermediate fluency**. Built with a **cumulative learning architecture**, higher levels incorporate all foundational material beneath them.

---

## Key Highlights & Philosophy

Unlike isolated study tools that treat JLPT levels as disconnected silos, **NihonHub** uses a **cumulative learning system**:
- **Studying for N2?** You get immediate access to all N5, N4, N3, and N2 content together.
- **Studying for N4?** You seamlessly review N5 foundations while tackling new elementary grammar.
- **Custom Filters:** Toggle **"Cumulative Mode"** on/off at any time to focus either strictly on one level or cumulatively across your journey.

---

## Interactive Features

- **Kanji Matrix**:
  - Detailed character cards with stroke counts, radicals, On'yomi (音読み), Kun'yomi (訓読み), and contextual compound vocabulary (熟語).
  - Modal inspector with high-visibility stroke preview and native pronunciation.
- **Vocabulary Vault**:
  - Core vocabulary organized by JLPT level and part of speech (Noun, Godan, Ichidan, Suru, Adjectives).
  - Pitch accents, Kana readings, Romaji, and natural contextual example sentences.
- **Grammar Guide**:
  - Comprehensive grammar points with structural formulas, nuances, and natural Japanese example sentences.
- **Interactive SRS Flashcards**:
  - 3D flip card animations with spaced repetition grading (*Again, Hard, Good, Easy*).
  - Filter deck by category (*Kanji, Vocab, Grammar, or All*).
  - Full keyboard shortcut support (*Space to flip, 1–4 to rate, Arrow keys to navigate*).
- **Mock Exams & Quizzes**:
  - Multi-choice exam questions testing Kanji readings, vocabulary definitions, and grammar particles.
  - Real-time 30-second timer, instant explanations, and detailed score breakdown with review lists.
- **Native Japanese Speech Synthesis**:
  - Built-in Web Speech API (`ja-JP`) audio player for every Kanji, vocabulary item, and example sentence without external server latency.
- **Furigana & Romaji Toggles**:
  - Global toggle buttons to show or hide `<ruby>` furigana annotations and Romaji for authentic reading practice.
- **Progress Tracker & Bookmarks**:
  - Tracks mastery percentages per level, saved favorites, and daily study streaks stored directly in `localStorage`.
- **Tokyo-Night & Wabi-Sabi Aesthetics**:
  - Glassmorphism design system, responsive mobile layout, custom Japanese typography (`Zen Maru Gothic`, `Noto Sans JP`), and Dark/Light mode switcher.

---

## JLPT Cumulative Levels

| Level | Rank | Target Scope | Core Content in NihonHub |
| :--- | :--- | :--- | :--- |
| **N5** | Basic / 基礎 | ~100 Kanji • ~800 Vocab | Basic particles, everyday verbs, introductory sentence structures (`〜は〜です`, `〜てください`, `〜たいです`) |
| **N4** | Elementary / 初級 | ~300 Kanji • ~1,500 Vocab | Daily conversation, te-form prohibition (`〜てはいけません`), past experience (`〜たことがある`), intent (`〜つもり`) |
| **N3** | Intermediate / 中級 | ~650 Kanji • ~3,750 Vocab | Bridge to fluency, social constraints (`〜わけにはいかない`), comparisons (`〜に対して`), news terms |
| **N2** | Upper-Intermediate / 中上級 | ~1,000 Kanji • ~6,000 Vocab | Business & media Japanese, advanced causation (`〜にほかならない`, `〜を契機に`, `〜を余儀なくされる`) |

---

## Keyboard Shortcuts

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

## GitHub Pages Deployment Guide

This project is built with **zero external build steps** and can be deployed directly to GitHub Pages in under 60 seconds:

1. **Push this repository to GitHub**:
   ```bash
   git add .
   git commit -m "feat: use clean SVG vector icons"
   git branch -M main
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on **GitHub.com**.
   - Navigate to **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Source / Build and deployment**, select:
     - **Source**: `Deploy from a branch`
     - **Branch**: `main` / `(root)`
   - Click **Save**.
3. **Your site is live!**
   - GitHub will provide your live URL (typically `https://<your-username>.github.io/<repo-name>/`).

---

## Technology Stack

- **Structure**: Semantic HTML5 with Ruby Furigana annotations (`<ruby>`, `<rt>`).
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism `backdrop-filter`, 3D CSS Transforms, Dark/Light mode).
- **Typography**: Google Fonts ([Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP), [Zen Maru Gothic](https://fonts.google.com/specimen/Zen+Maru+Gothic), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)).
- **Logic**: Vanilla ES6+ JavaScript (State management, Spaced Repetition engine, Web Speech Audio API, LocalStorage persistence).

---

## Project Structure

```
Nihon2/
├── index.html          # Main SPA entry point with all learning tabs & SEO tags
├── css/
│   └── style.css       # Complete design system, glassmorphism & responsive rules
├── js/
│   ├── data.js         # Curated JLPT N5, N4, N3, N2 master dataset & Kana tables
│   └── app.js          # Interactive application engine, audio synthesis & SRS logic
├── README.md           # Documentation, level guide & deployment instructions
├── .gitignore          # Git ignore rules
└── LICENSE             # MIT License
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

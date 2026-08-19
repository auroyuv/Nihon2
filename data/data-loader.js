/**
 * NihonHub - Master Data Loader & Indexer
 * Aggregates all modular level datasets (N5 to N2), handles cross-book deduplication,
 * normalizes multi-level tags, and constructs the unified `window.JLPT_DATA`.
 */

(function () {
  'use strict';

  // Helper to deduplicate and merge arrays of items
  function mergeAndDeduplicate(rawArrays, keyField) {
    const map = new Map();

    rawArrays.forEach(arr => {
      if (!Array.isArray(arr)) return;
      arr.forEach(item => {
        const key = item[keyField];
        if (!key) return;

        if (map.has(key)) {
          const existing = map.get(key);
          
          // Merge levels
          const itemLevels = item.levels || (item.level ? [item.level] : []);
          const existingLevels = existing.levels || (existing.level ? [existing.level] : []);
          existing.levels = Array.from(new Set([...existingLevels, ...itemLevels]));
          existing.level = existing.levels[0] || 'N5';

          // Merge sources / books
          const itemSources = item.sources || [];
          const existingSources = existing.sources || [];
          existing.sources = [...existingSources];
          itemSources.forEach(s => {
            if (!existing.sources.some(es => es.book === s.book && es.chapter === s.chapter && es.lesson === s.lesson)) {
              existing.sources.push(s);
            }
          });

          // Merge examples if present
          if (item.examples && existing.examples) {
            item.examples.forEach(ex => {
              if (!existing.examples.some(eex => eex.word === ex.word || eex.ja === ex.ja)) {
                existing.examples.push(ex);
              }
            });
          }
        } else {
          // Normalize item
          const cloned = JSON.parse(JSON.stringify(item));
          if (!cloned.levels) {
            cloned.levels = cloned.level ? [cloned.level] : ['N5'];
          }
          if (!cloned.level) {
            cloned.level = cloned.levels[0] || 'N5';
          }
          if (!cloned.sources) {
            cloned.sources = [];
          }
          map.set(key, cloned);
        }
      });
    });

    return Array.from(map.values());
  }

  // Gather raw data from modular window globals
  const rawKanji = [
    window.N5_KANJI_DATA,
    window.N4_KANJI_DATA,
    window.N3_KANJI_DATA,
    window.N2_KANJI_DATA
  ];

  const rawVocabulary = [
    window.N5_VOCABULARY_DATA,
    window.N4_VOCABULARY_DATA,
    window.N3_VOCABULARY_DATA,
    window.N2_VOCABULARY_DATA
  ];

  const rawGrammar = [
    window.N5_GRAMMAR_DATA,
    window.N4_GRAMMAR_DATA,
    window.N3_GRAMMAR_DATA,
    window.N2_GRAMMAR_DATA
  ];

  const rawReading = [
    window.N5_READING_DATA,
    window.N4_READING_DATA,
    window.N3_READING_DATA,
    window.N2_READING_DATA
  ];

  const rawListening = [
    window.N5_LISTENING_DATA,
    window.N4_LISTENING_DATA,
    window.N3_LISTENING_DATA,
    window.N2_LISTENING_DATA
  ];

  const mergedKanji = mergeAndDeduplicate(rawKanji, 'char');
  const mergedVocab = mergeAndDeduplicate(rawVocabulary, 'word');
  const mergedGrammar = mergeAndDeduplicate(rawGrammar, 'pattern');
  const mergedReading = mergeAndDeduplicate(rawReading, 'id');
  const mergedListening = mergeAndDeduplicate(rawListening, 'id');
  const quizzes = window.QUIZ_DATA || [];
  const kana = window.KANA_DATA || { hiragana: [], katakana: [] };

  // Construct Master JLPT_DATA Object
  window.JLPT_DATA = {
    levels: [
      { id: 'N5', name: 'JLPT N5', title: 'Beginner / 基礎', desc: 'Basic Japanese, ~100 Kanji, ~800 Vocab, introductory grammar.' },
      { id: 'N4', name: 'JLPT N4', title: 'Elementary / 初級', desc: 'Everyday conversations, ~300 Kanji, ~1,500 Vocab, daily life situations.' },
      { id: 'N3', name: 'JLPT N3', title: 'Intermediate / 中級', desc: 'Bridge to fluency, ~650 Kanji, ~3,750 Vocab, articles & daily conversations.' },
      { id: 'N2', name: 'JLPT N2', title: 'Upper-Intermediate / 中上級', desc: 'Business & media, ~1,000 Kanji, ~6,000 Vocab, nuance and complex texts.' }
    ],
    kana: kana,
    kanji: mergedKanji,
    vocabulary: mergedVocab,
    grammar: mergedGrammar,
    reading: mergedReading,
    listening: mergedListening,
    quizzes: quizzes,

    // Helper: Collect all distinct books / textbooks
    getAllTextbooks: function () {
      const books = new Set();
      const allItems = [...this.kanji, ...this.vocabulary, ...this.grammar, ...this.reading, ...this.listening];
      allItems.forEach(item => {
        if (Array.isArray(item.sources)) {
          item.sources.forEach(s => {
            if (s.book) books.add(s.book.split(' ')[0]); // e.g. 'Sou Matome', 'Marugoto'
          });
        }
      });
      return Array.from(books);
    }
  };

})();

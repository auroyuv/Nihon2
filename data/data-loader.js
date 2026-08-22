/**
 * NihonHub - Master Data Loader & Cross-Level Origin Indexer
 * Aggregates all modular level datasets (N5 to N2), handles cross-book deduplication,
 * detects first-introduced levels (Origin Level), unifies compound vocabulary across levels,
 * builds rich Kanji Building-Block anatomy mappings, and normalizes multi-level citations into `window.JLPT_DATA`.
 */

(function () {
  'use strict';

  const LEVEL_ORDER = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4, 'N1': 5 };

  // Helper to merge, deduplicate, and track origin/progression
  function mergeAndIndexDatasets(rawLevelMap, keyField) {
    const map = new Map();
    const orderedLevels = ['N5', 'N4', 'N3', 'N2'];

    orderedLevels.forEach(level => {
      const arr = rawLevelMap[level];
      if (!Array.isArray(arr)) return;

      arr.forEach(item => {
        const key = item[keyField];
        if (!key) return;

        const defaultSource = (item.sources && item.sources[0] && item.sources[0].book) ? item.sources[0].book : (level + ' Course');

        if (map.has(key)) {
          const existing = map.get(key);

          // Add level to levels list if not already present
          if (!existing.levels.includes(level)) {
            existing.levels.push(level);
            existing.levels.sort((a, b) => (LEVEL_ORDER[a] || 99) - (LEVEL_ORDER[b] || 99));
          }

          // Merge sources without duplication
          const itemSources = item.sources || [];
          itemSources.forEach(s => {
            const isDup = existing.sources.some(es => 
              es.book === s.book && es.chapter === s.chapter && es.lesson === s.lesson && es.notes === s.notes
            );
            if (!isDup) {
              existing.sources.push(s);
            }
          });

          // Merge vocabulary compound examples with unified multi-level tracking
          if (Array.isArray(item.examples)) {
            if (!Array.isArray(existing.examples)) existing.examples = [];
            item.examples.forEach(ex => {
              const existingEx = existing.examples.find(eex => 
                (eex.word && ex.word && eex.word === ex.word) || 
                (eex.ja && ex.ja && eex.ja === ex.ja)
              );

              if (existingEx) {
                if (!Array.isArray(existingEx.levels)) existingEx.levels = [existingEx.level || existingEx.firstLevel || 'N5'];
                if (!existingEx.levels.includes(level)) {
                  existingEx.levels.push(level);
                  existingEx.levels.sort((a, b) => (LEVEL_ORDER[a] || 99) - (LEVEL_ORDER[b] || 99));
                }
                const newSource = ex.source || defaultSource;
                if (!Array.isArray(existingEx.sources)) existingEx.sources = existingEx.source ? [existingEx.source] : [];
                if (newSource && !existingEx.sources.includes(newSource)) {
                  existingEx.sources.push(newSource);
                }
              } else {
                const exClone = JSON.parse(JSON.stringify(ex));
                exClone.firstLevel = level;
                exClone.levels = [level];
                exClone.sources = [ex.source || defaultSource];
                exClone.level = level;
                exClone.source = ex.source || defaultSource;
                existing.examples.push(exClone);
              }
            });
          }

          // Merge readings & meanings if richer
          if (!existing.onyomi && item.onyomi) existing.onyomi = item.onyomi;
          if (!existing.kunyomi && item.kunyomi) existing.kunyomi = item.kunyomi;
          if (!existing.radical && item.radical) existing.radical = item.radical;
          if (!existing.strokes && item.strokes) existing.strokes = item.strokes;

        } else {
          // Brand new entry in the index
          const cloned = JSON.parse(JSON.stringify(item));
          
          cloned.firstLevel = level;
          cloned.levels = cloned.levels && cloned.levels.length > 0 ? cloned.levels : [level];
          if (!cloned.levels.includes(level)) {
            cloned.levels.push(level);
          }
          cloned.levels.sort((a, b) => (LEVEL_ORDER[a] || 99) - (LEVEL_ORDER[b] || 99));
          
          if (!Array.isArray(cloned.sources)) {
            cloned.sources = [];
          }
          
          if (Array.isArray(cloned.examples)) {
            cloned.examples = cloned.examples.map(ex => {
              const exClone = JSON.parse(JSON.stringify(ex));
              exClone.firstLevel = level;
              exClone.levels = [level];
              exClone.sources = [ex.source || defaultSource];
              exClone.level = level;
              exClone.source = ex.source || defaultSource;
              return exClone;
            });
          } else {
            cloned.examples = [];
          }

          map.set(key, cloned);
        }
      });
    });

    return Array.from(map.values());
  }

  // Gather raw datasets by level
  const kanjiByLevel = {
    'N5': window.N5_KANJI_DATA || [],
    'N4': window.N4_KANJI_DATA || [],
    'N3': window.N3_KANJI_DATA || [],
    'N2': window.N2_KANJI_DATA || []
  };

  const vocabByLevel = {
    'N5': window.N5_VOCABULARY_DATA || [],
    'N4': window.N4_VOCABULARY_DATA || [],
    'N3': window.N3_VOCABULARY_DATA || [],
    'N2': window.N2_VOCABULARY_DATA || []
  };

  const grammarByLevel = {
    'N5': window.N5_GRAMMAR_DATA || [],
    'N4': window.N4_GRAMMAR_DATA || [],
    'N3': window.N3_GRAMMAR_DATA || [],
    'N2': window.N2_GRAMMAR_DATA || []
  };

  const readingByLevel = {
    'N5': window.N5_READING_DATA || [],
    'N4': window.N4_READING_DATA || [],
    'N3': window.N3_READING_DATA || [],
    'N2': window.N2_READING_DATA || []
  };

  const listeningByLevel = {
    'N5': window.N5_LISTENING_DATA || [],
    'N4': window.N4_LISTENING_DATA || [],
    'N3': window.N3_LISTENING_DATA || [],
    'N2': window.N2_LISTENING_DATA || []
  };

  const mergedKanji = mergeAndIndexDatasets(kanjiByLevel, 'char');
  const standaloneVocab = mergeAndIndexDatasets(vocabByLevel, 'word');
  const mergedGrammar = mergeAndIndexDatasets(grammarByLevel, 'pattern');
  const mergedReading = mergeAndIndexDatasets(readingByLevel, 'id');
  const mergedListening = mergeAndIndexDatasets(listeningByLevel, 'id');

  // Build Kanji fast-lookup map by character
  const kanjiMap = new Map();
  mergedKanji.forEach(k => {
    if (k.char) kanjiMap.set(k.char, k);
  });

  // --- UNIFY VOCABULARY: Standalone + All Kanji Compound Target Vocabulary ---
  const unifiedVocabMap = new Map();

  // 1. Insert standalone vocabulary words
  standaloneVocab.forEach(v => {
    const cloned = JSON.parse(JSON.stringify(v));
    cloned.isKanjiCompound = false;
    cloned.parentKanji = [];
    unifiedVocabMap.set(cloned.word, cloned);
  });

  // 2. Aggregate all compound words from Kanji syllabus examples
  mergedKanji.forEach(k => {
    (k.examples || []).forEach(ex => {
      const wordText = ex.word || ex.ja;
      if (!wordText) return;

      const defaultSource = (k.sources && k.sources[0]) ? k.sources[0] : { book: 'Sou Matome ' + k.firstLevel + ' Kanji', chapter: '' };

      if (unifiedVocabMap.has(wordText)) {
        const existing = unifiedVocabMap.get(wordText);
        existing.isKanjiCompound = true;
        if (!existing.parentKanji) existing.parentKanji = [];
        if (!existing.parentKanji.includes(k.char)) existing.parentKanji.push(k.char);

        // Merge levels
        const exLevels = ex.levels || (ex.level ? [ex.level] : k.levels);
        exLevels.forEach(lvl => {
          if (!existing.levels.includes(lvl)) {
            existing.levels.push(lvl);
            existing.levels.sort((a, b) => (LEVEL_ORDER[a] || 99) - (LEVEL_ORDER[b] || 99));
          }
        });

        // Merge sources
        const newSrc = ex.source ? { book: ex.source } : defaultSource;
        const srcExists = existing.sources.some(s => s.book === newSrc.book);
        if (!srcExists) existing.sources.push(newSrc);

        if (!existing.reading && ex.reading) existing.reading = ex.reading;
        if (!existing.meaning && ex.meaning) existing.meaning = ex.meaning;

      } else {
        // Brand new compound vocabulary entry
        const exLevels = ex.levels || (ex.level ? [ex.level] : [k.firstLevel || 'N5']);
        const sources = [];
        if (ex.source) sources.push({ book: ex.source });
        else if (k.sources && k.sources[0]) sources.push(k.sources[0]);

        const newVocabItem = {
          id: 'v-cmp-' + (ex.id || encodeURIComponent(wordText)),
          word: wordText,
          reading: ex.reading || '',
          romaji: ex.romaji || '',
          meaning: ex.meaning || '',
          levels: [...exLevels].sort((a, b) => (LEVEL_ORDER[a] || 99) - (LEVEL_ORDER[b] || 99)),
          firstLevel: ex.firstLevel || exLevels[0] || k.firstLevel || 'N5',
          isKanjiCompound: true,
          parentKanji: [k.char],
          sources: sources,
          example: ex.example || null
        };
        unifiedVocabMap.set(wordText, newVocabItem);
      }
    });
  });

  const mergedVocab = Array.from(unifiedVocabMap.values());

  // 3. Enrich all vocabulary items with Kanji Anatomy Components
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/g;
  mergedVocab.forEach(item => {
    const charsInWord = item.word.match(kanjiRegex) || [];
    const components = [];
    charsInWord.forEach(ch => {
      const kObj = kanjiMap.get(ch);
      if (kObj) {
        components.push({
          char: ch,
          meaning: kObj.meaning,
          level: kObj.firstLevel || (kObj.levels ? kObj.levels[0] : 'N5'),
          onyomi: kObj.onyomi,
          kunyomi: kObj.kunyomi,
          id: kObj.id
        });
        if (!item.parentKanji) item.parentKanji = [];
        if (!item.parentKanji.includes(ch)) item.parentKanji.push(ch);
        item.isKanjiCompound = true;
      } else {
        components.push({
          char: ch,
          meaning: 'Kanji',
          level: 'External',
          onyomi: '',
          kunyomi: '',
          id: null
        });
      }
    });
    item.kanjiComponents = components;
  });

  const kana = window.KANA_DATA || { hiragana: [], katakana: [] };

  // Construct Master JLPT_DATA Object with rich query helpers
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
    kanjiMap: kanjiMap,

    // Helper: Find Kanji Object by character
    getKanjiByChar: function (char) {
      return kanjiMap.get(char) || null;
    },

    // Helper: Find all vocabulary containing a specific Kanji character
    getWordsForKanji: function (char) {
      return this.vocabulary.filter(v => v.word && v.word.includes(char));
    },

    // Helper: Determine if item is brand-new or review in a given level
    getItemStatusInLevel: function (item, targetLevel) {
      if (!targetLevel || targetLevel === 'ALL') {
        return { isNew: true, originLevel: item.firstLevel || 'N5', status: 'ALL' };
      }
      const isPresent = item.levels && item.levels.includes(targetLevel);
      if (!isPresent) {
        return { isNew: false, originLevel: item.firstLevel || 'N5', status: 'NOT_IN_LEVEL' };
      }
      const isNew = item.firstLevel === targetLevel;
      return {
        isNew: isNew,
        originLevel: item.firstLevel || targetLevel,
        status: isNew ? 'NEW' : 'REVIEW'
      };
    },

    // Helper: Get counts breakdown for a level
    getLevelStats: function (category, level) {
      const list = this[category] || [];
      if (level === 'ALL') {
        return { total: list.length, newCount: list.length, reviewCount: 0 };
      }
      const inLevel = list.filter(item => item.levels && item.levels.includes(level));
      const newItems = inLevel.filter(item => item.firstLevel === level);
      const reviewItems = inLevel.filter(item => item.firstLevel !== level);
      return {
        total: inLevel.length,
        newCount: newItems.length,
        reviewCount: reviewItems.length
      };
    },

    // Helper: Collect all distinct books / textbooks
    getAllTextbooks: function () {
      const books = new Set();
      const allItems = [...this.kanji, ...this.vocabulary, ...this.grammar, ...this.reading, ...this.listening];
      allItems.forEach(item => {
        if (Array.isArray(item.sources)) {
          item.sources.forEach(s => {
            if (s.book) books.add(s.book);
          });
        }
      });
      return Array.from(books);
    }
  };

})();

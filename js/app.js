/**
 * NihonHub - Interactive Application Engine
 * Comprehensive JLPT N5 to N2 Learning Platform
 * Unified 2,450+ Vocabulary Vault, 3-Way Script Display Modes (Kanji / Hiragana / Progressive Hybrid),
 * Kanji Building-Block Anatomy Breakdown, Personal Mastery Tracking, Dual Audio Speed, Memory Recall Mode,
 * and 100% Dynamic Textbook & Chapter Filtering.
 */

(function () {
  'use strict';

  // --- SVG ICONS ---
  const UI_ICONS = {
    volume: `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    starOutline: `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starFilled: `<svg class="ui-icon text-warning" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    sun: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    book: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
    check: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    sparkles: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    search: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
  };

  // --- APPLICATION STATE ---
  const state = {
    currentTab: 'kanji',
    selectedLevel: 'ALL',
    originFilter: 'ALL', // 'ALL', 'NEW', 'REVIEW'
    searchQuery: '',
    showFurigana: true,
    showRomaji: true,
    hideEnglish: false,
    audioSpeed: 0.9, // 0.9 (Normal) vs 0.72 (Slow)
    theme: 'dark',
    bookmarks: new Set(),
    mastered: new Set(), // Set of mastered item IDs

    // Vocab Tab Specific Controls
    vocabScriptMode: 'kanji', // 'kanji', 'hiragana', 'progressive'
    vocabTypeFilter: 'ALL',   // 'ALL', 'COMPOUNDS', 'GENERAL'

    // Dynamic textbook & chapter filters per category
    filters: {
      kanji: { book: 'ALL', chapter: 'ALL' },
      vocabulary: { book: 'ALL', chapter: 'ALL' },
      grammar: { book: 'ALL', chapter: 'ALL' }
    },

    // View Modes per Category ('cards' | 'table')
    viewModes: {
      kanji: 'cards',
      vocabulary: 'cards',
      grammar: 'cards',
      bookmarks: 'cards'
    },

    // Flashcard state
    flashcards: {
      category: 'kanji',   // 'kanji' | 'vocab' | 'grammar' | 'bookmarks'
      book: 'ALL',
      chapter: 'ALL',
      status: 'ALL',       // 'ALL' | 'UNMASTERED' | 'MASTERED'
      deck: [],
      currentIndex: 0,
      isFlipped: false
    }
  };

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    initTheme();
    initScrollObserver();
    setupEventListeners();
    buildFlashcardDeck();
    renderAll();
  });

  // --- PREFERENCES STORAGE ---
  function loadPreferences() {
    try {
      const savedTheme = localStorage.getItem('nihon_theme');
      if (savedTheme) state.theme = savedTheme;

      const savedFurigana = localStorage.getItem('nihon_furigana');
      if (savedFurigana !== null) state.showFurigana = savedFurigana === 'true';

      const savedRomaji = localStorage.getItem('nihon_romaji');
      if (savedRomaji !== null) state.showRomaji = savedRomaji === 'true';

      const savedHideEnglish = localStorage.getItem('nihon_hide_english');
      if (savedHideEnglish !== null) state.hideEnglish = savedHideEnglish === 'true';

      const savedAudioSpeed = localStorage.getItem('nihon_audio_speed');
      if (savedAudioSpeed !== null) state.audioSpeed = parseFloat(savedAudioSpeed);

      const savedScriptMode = localStorage.getItem('nihon_vocab_script_mode');
      if (savedScriptMode) state.vocabScriptMode = savedScriptMode;

      const savedBookmarks = localStorage.getItem('nihon_bookmarks');
      if (savedBookmarks) state.bookmarks = new Set(JSON.parse(savedBookmarks));

      const savedMastered = localStorage.getItem('nihon_mastered');
      if (savedMastered) state.mastered = new Set(JSON.parse(savedMastered));

      const savedViewModes = localStorage.getItem('nihon_view_modes');
      if (savedViewModes) state.viewModes = Object.assign(state.viewModes, JSON.parse(savedViewModes));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem('nihon_theme', state.theme);
      localStorage.setItem('nihon_furigana', state.showFurigana);
      localStorage.setItem('nihon_romaji', state.showRomaji);
      localStorage.setItem('nihon_hide_english', state.hideEnglish);
      localStorage.setItem('nihon_audio_speed', state.audioSpeed);
      localStorage.setItem('nihon_vocab_script_mode', state.vocabScriptMode);
      localStorage.setItem('nihon_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
      localStorage.setItem('nihon_mastered', JSON.stringify(Array.from(state.mastered)));
      localStorage.setItem('nihon_view_modes', JSON.stringify(state.viewModes));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // --- THEME MANAGEMENT ---
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const themeIcon = document.getElementById('theme-icon-container');
    const themeText = document.getElementById('theme-text-container');
    if (themeIcon) {
      themeIcon.innerHTML = state.theme === 'dark' ? UI_ICONS.sun : UI_ICONS.moon;
    }
    if (themeText) {
      themeText.textContent = state.theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    initTheme();
    savePreferences();
  }

  // --- NATIVE SPEECH SYNTHESIS (WITH SPEED CONTROL) ---
  function speakJapanese(text) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\[.*?\]/g, '').replace(/[\/〜～・]/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = state.audioSpeed || 0.9;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
    if (jaVoice) utterance.voice = jaVoice;

    window.speechSynthesis.speak(utterance);
  }

  function toggleAudioSpeed() {
    state.audioSpeed = state.audioSpeed > 0.8 ? 0.72 : 0.92;
    const isNormal = state.audioSpeed > 0.8;
    const speedIcon = document.getElementById('audio-speed-icon');
    const speedText = document.getElementById('audio-speed-text');
    if (speedIcon) speedIcon.textContent = isNormal ? '🐇' : '🐢';
    if (speedText) speedText.textContent = isNormal ? '1.0x Audio' : '0.75x Audio';
    savePreferences();
  }

  // --- FURIGANA PARSER ---
  function parseFurigana(text) {
    if (!text) return '';
    return text.replace(/([一-龯々]+)\[(.*?)\]/g, (match, kanji, kana) => {
      return `<ruby>${kanji}<rt class="rt-furigana">${kana}</rt></ruby>`;
    });
  }

  // Helper: Render source badges
  function renderSourcesHtml(sources) {
    if (!Array.isArray(sources) || sources.length === 0) return '';
    return `
      <div class="source-badges-row">
        ${sources.map(s => `
          <span class="source-pill" title="${s.notes ? s.notes : ''}">
            ${UI_ICONS.book} ${s.book}${s.chapter ? ` (${s.chapter})` : s.lesson ? ` (${s.lesson})` : ''}
          </span>
        `).join('')}
      </div>
    `;
  }

  // Helper: Render level pills
  function renderLevelPills(levels) {
    const arr = Array.isArray(levels) ? levels : [levels || 'N5'];
    return arr.map(lvl => `<span class="level-badge badge-${lvl.toLowerCase()}">${lvl}</span>`).join(' ');
  }

  // Helper: Render origin tag for items (✨ New vs 🔄 Review)
  function renderOriginBadge(item) {
    const firstLevel = item.firstLevel || (item.levels ? item.levels[0] : 'N5');
    if (state.selectedLevel === 'ALL') {
      return `<span class="origin-tag info" title="First introduced in JLPT ${firstLevel}">Origin: ${firstLevel}</span>`;
    }
    if (firstLevel === state.selectedLevel) {
      return `<span class="origin-tag new" title="Introduced for the first time in JLPT ${state.selectedLevel}">✨ New in ${state.selectedLevel}</span>`;
    }
    return `<span class="origin-tag review" title="First learned in JLPT ${firstLevel} &bull; Practicing advanced ${state.selectedLevel} compound words">🔄 From ${firstLevel}</span>`;
  }

  // --- MASTERY TRACKER ---
  function toggleMastery(id) {
    if (state.mastered.has(id)) {
      state.mastered.delete(id);
    } else {
      state.mastered.add(id);
    }
    savePreferences();
    updateMasteryHeaderStatus();
    renderActiveTab();
  }

  function updateMasteryHeaderStatus() {
    const el = document.getElementById('mastery-stats-text');
    if (!el) return;
    const count = state.mastered.size;
    el.textContent = `${count} Mastered`;
  }

  // --- DYNAMIC SOURCE / BOOK / CHAPTER QUERY HELPERS ---
  // --- DYNAMIC SOURCE / BOOK / CHAPTER QUERY HELPERS ---
  function getAvailableBooks(category, level) {
    const masterList = (window.JLPT_DATA && window.JLPT_DATA[category]) ? window.JLPT_DATA[category] : [];
    let levelItems = masterList.filter(item => level === 'ALL' || (item.levels && item.levels.includes(level)));
    
    if (category === 'vocabulary') {
      if (state.vocabTypeFilter === 'TEXTBOOK') {
        levelItems = masterList.filter(item => {
          if (!item.isTextbookVocab) return false;
          return level === 'ALL' || (item.textbookLevels && item.textbookLevels.includes(level));
        });
      } else if (state.vocabTypeFilter === 'COMPOUNDS') {
        levelItems = masterList.filter(item => {
          if (!item.isKanjiCompound) return false;
          return level === 'ALL' || (item.compoundLevels && item.compoundLevels.includes(level));
        });
      }
    }
    const bookMap = new Map();

    levelItems.forEach(item => {
      let srcList = item.sources || [];
      if (category === 'vocabulary') {
        if (state.vocabTypeFilter === 'TEXTBOOK' && item.textbookSources && item.textbookSources.length > 0) {
          srcList = item.textbookSources;
        } else if (state.vocabTypeFilter === 'COMPOUNDS' && item.compoundSources && item.compoundSources.length > 0) {
          srcList = item.compoundSources;
        }
      }
      const distinctBooks = [...new Set(srcList.map(s => s.book).filter(Boolean))];
      distinctBooks.forEach(b => {
        bookMap.set(b, (bookMap.get(b) || 0) + 1);
      });
    });

    return Array.from(bookMap.entries())
      .map(([book, count]) => ({ book, count }))
      .sort((a, b) => b.count - a.count);
  }

  function getAvailableChapters(category, level, selectedBook) {
    const masterList = (window.JLPT_DATA && window.JLPT_DATA[category]) ? window.JLPT_DATA[category] : [];
    let levelItems = masterList.filter(item => level === 'ALL' || (item.levels && item.levels.includes(level)));
    
    if (category === 'vocabulary') {
      if (state.vocabTypeFilter === 'TEXTBOOK') {
        levelItems = masterList.filter(item => {
          if (!item.isTextbookVocab) return false;
          return level === 'ALL' || (item.textbookLevels && item.textbookLevels.includes(level));
        });
      } else if (state.vocabTypeFilter === 'COMPOUNDS') {
        levelItems = masterList.filter(item => {
          if (!item.isKanjiCompound) return false;
          return level === 'ALL' || (item.compoundLevels && item.compoundLevels.includes(level));
        });
      }
    }
    const chapterMap = new Map();

    levelItems.forEach(item => {
      let srcList = item.sources || [];
      if (category === 'vocabulary') {
        if (state.vocabTypeFilter === 'TEXTBOOK' && item.textbookSources && item.textbookSources.length > 0) {
          srcList = item.textbookSources;
        } else if (state.vocabTypeFilter === 'COMPOUNDS' && item.compoundSources && item.compoundSources.length > 0) {
          srcList = item.compoundSources;
        }
      }
      srcList.forEach(s => {
        if (selectedBook !== 'ALL' && s.book !== selectedBook) return;
        const rawChap = s.chapter || s.lesson;
        if (!rawChap) return;

        let groupKey = rawChap;
        const weekMatch = rawChap.match(/^(Week\s+\d+)/i);
        const lessonMatch = rawChap.match(/^(Lesson\s+\d+)/i);
        const chapterMatch = rawChap.match(/^(Chapter\s+\d+)/i);
        if (weekMatch) {
          groupKey = weekMatch[1];
        } else if (lessonMatch) {
          groupKey = lessonMatch[1];
        } else if (chapterMatch) {
          groupKey = chapterMatch[1];
        }

        if (!chapterMap.has(groupKey)) {
          chapterMap.set(groupKey, {
            id: groupKey,
            label: groupKey,
            items: new Set()
          });
        }
        chapterMap.get(groupKey).items.add(item.id || item.char || item.word || item.pattern);
      });
    });

    return Array.from(chapterMap.values()).map(c => ({
      id: c.id,
      label: c.label,
      count: c.items.size
    })).sort((a, b) => {
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  // --- DYNAMIC SOURCE FILTER COMPONENT RENDERER ---
  function renderSourceFilter(category) {
    let selectId, pillsContainerId, titleId;
    if (category === 'kanji') {
      selectId = 'kanji-book-select';
      pillsContainerId = 'week-pills-container';
      titleId = 'kanji-chapter-filter-title';
    } else if (category === 'vocabulary') {
      selectId = 'vocab-book-select';
      pillsContainerId = 'vocab-chapter-pills-container';
    } else if (category === 'grammar') {
      selectId = 'grammar-book-select';
      pillsContainerId = 'grammar-chapter-pills-container';
    }

    const selectEl = document.getElementById(selectId);
    const pillsEl = document.getElementById(pillsContainerId);
    const titleEl = titleId ? document.getElementById(titleId) : null;
    if (!selectEl || !pillsEl) return;

    const currentFilter = state.filters[category] || { book: 'ALL', chapter: 'ALL' };
    const availableBooks = getAvailableBooks(category, state.selectedLevel);
    
    let currentCategoryTotal = 0;
    if (category === 'vocabulary' && window.JLPT_DATA.getVocabStats) {
      const vStats = window.JLPT_DATA.getVocabStats(state.selectedLevel);
      currentCategoryTotal = state.vocabTypeFilter === 'TEXTBOOK' ? vStats.textbookCount :
                             state.vocabTypeFilter === 'COMPOUNDS' ? vStats.compoundsCount : vStats.total;
    } else {
      const stats = window.JLPT_DATA ? window.JLPT_DATA.getLevelStats(category, state.selectedLevel) : { total: 0 };
      currentCategoryTotal = stats.total;
    }

    if (currentFilter.book !== 'ALL' && !availableBooks.some(b => b.book === currentFilter.book)) {
      currentFilter.book = 'ALL';
    }

    let selectOptions = `<option value="ALL">All Textbooks (${currentCategoryTotal})</option>`;
    availableBooks.forEach(b => {
      const isSelected = currentFilter.book === b.book ? 'selected' : '';
      selectOptions += `<option value="${b.book}" ${isSelected}>${b.book} (${b.count})</option>`;
    });
    selectEl.innerHTML = selectOptions;

    if (titleEl) {
      if (currentFilter.book !== 'ALL') {
        titleEl.textContent = `${currentFilter.book} Chapter Filter`;
      } else if (state.selectedLevel !== 'ALL') {
        titleEl.textContent = `JLPT ${state.selectedLevel} Kanji Curriculum`;
      } else {
        titleEl.textContent = `All Levels Kanji Curriculum`;
      }
    }

    const availableChapters = getAvailableChapters(category, state.selectedLevel, currentFilter.book);
    if (currentFilter.chapter !== 'ALL' && !availableChapters.some(c => c.id === currentFilter.chapter)) {
      currentFilter.chapter = 'ALL';
    }

    let selectedBookTotal = currentCategoryTotal;
    if (currentFilter.book !== 'ALL') {
      const bObj = availableBooks.find(b => b.book === currentFilter.book);
      if (bObj) selectedBookTotal = bObj.count;
    }

    let pillsHtml = `
      <button class="week-pill ${currentFilter.chapter === 'ALL' ? 'active' : ''}" data-chap="ALL">
        All Chapters (${selectedBookTotal})
      </button>
    `;

    availableChapters.forEach(c => {
      const isAct = currentFilter.chapter === c.id ? 'active' : '';
      pillsHtml += `
        <button class="week-pill ${isAct}" data-chap="${c.id}">
          ${c.label} (${c.count})
        </button>
      `;
    });

    pillsEl.innerHTML = pillsHtml;

    selectEl.onchange = function () {
      currentFilter.book = this.value;
      currentFilter.chapter = 'ALL';
      renderSourceFilter(category);
      if (category === 'kanji') renderKanji();
      else if (category === 'vocabulary') renderVocabulary();
      else if (category === 'grammar') renderGrammar();
    };

    pillsEl.querySelectorAll('.week-pill').forEach(pill => {
      pill.addEventListener('click', function () {
        pillsEl.querySelectorAll('.week-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        currentFilter.chapter = this.getAttribute('data-chap');
        if (category === 'kanji') renderKanji();
        else if (category === 'vocabulary') renderVocabulary();
        else if (category === 'grammar') renderGrammar();
      });
    });
  }

  // --- LEVEL PROGRESSION BANNER UPDATE ---
  function updateLevelProgressionBanner() {
    const banner = document.getElementById('level-progression-banner');
    if (!banner || !window.JLPT_DATA) return;

    let category = 'kanji';
    let catTitle = 'Kanji';
    if (state.currentTab === 'vocab') {
      category = 'vocabulary';
      catTitle = 'Vocabulary';
    } else if (state.currentTab === 'grammar') {
      category = 'grammar';
      catTitle = 'Grammar';
    }

    const masterList = window.JLPT_DATA[category] || [];
    const totalMasterCount = masterList.length;
    const stats = window.JLPT_DATA.getLevelStats(category, state.selectedLevel);

    const pillAll = document.getElementById('scope-count-all');
    const pillNew = document.getElementById('scope-count-new');
    const pillReview = document.getElementById('scope-count-review');

    if (pillAll) pillAll.textContent = stats.total;
    if (pillNew) pillNew.textContent = stats.newCount;
    if (pillReview) pillReview.textContent = stats.reviewCount;

    const newPct = stats.total > 0 ? Math.round((stats.newCount / stats.total) * 100) : 100;
    const reviewPct = stats.total > 0 ? 100 - newPct : 0;

    // Update Header Level Badge
    const badgeEl = document.getElementById('active-level-indicator-badge');
    if (badgeEl) {
      badgeEl.textContent = state.selectedLevel;
      badgeEl.className = `header-level-badge badge-${state.selectedLevel.toLowerCase()}`;
    }

    if (state.selectedLevel === 'ALL') {
      const n5Count = masterList.filter(i => (i.firstLevel === 'N5' || (i.levels && i.levels.includes('N5')))).length;
      const n4Count = masterList.filter(i => (i.firstLevel === 'N4' || (i.levels && i.levels.includes('N4')))).length;
      const n3Count = masterList.filter(i => (i.firstLevel === 'N3' || (i.levels && i.levels.includes('N3')))).length;
      const n2Count = masterList.filter(i => (i.firstLevel === 'N2' || (i.levels && i.levels.includes('N2')))).length;

      banner.innerHTML = `
        <div class="compact-banner-row">
          <div class="compact-banner-left">
            <span class="compact-banner-title">Cumulative ${catTitle}:</span>
            <span class="compact-banner-badge-big">${totalMasterCount} Total</span>
          </div>
          <div class="compact-origin-pills">
            <span class="prog-chip-sm badge-n5">N5: ${n5Count}</span>
            <span class="prog-chip-sm badge-n4">N4: ${n4Count}</span>
            <span class="prog-chip-sm badge-n3">N3: ${n3Count}</span>
            <span class="prog-chip-sm badge-n2">N2: ${n2Count}</span>
          </div>
        </div>
      `;
    } else {
      if (state.currentTab === 'vocab' && window.JLPT_DATA.getVocabStats) {
        const vStats = window.JLPT_DATA.getVocabStats(state.selectedLevel);
        banner.innerHTML = `
          <div class="compact-banner-row">
            <div class="compact-banner-left">
              <span class="compact-banner-title">JLPT ${state.selectedLevel} ${catTitle}:</span>
              <span class="compact-banner-badge-big">${vStats.total} Total</span>
            </div>
            <div class="compact-origin-pills">
              <span class="prog-chip-sm" style="background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3);" title="Extracted from textbook chapters">📚 Textbook Vocab: <strong>${vStats.textbookCount}</strong></span>
              <span class="prog-chip-sm" style="background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);" title="Learned from Kanji stroke examples">🈁 Kanji Compounds: <strong>${vStats.compoundsCount}</strong></span>
            </div>
          </div>
        `;
      } else {
        banner.innerHTML = `
          <div class="compact-banner-row">
            <div class="compact-banner-left">
              <span class="compact-banner-title">JLPT ${state.selectedLevel} ${catTitle}:</span>
              <span class="compact-banner-badge-big">${stats.total} Total</span>
            </div>
            <div class="compact-origin-pills">
              <span class="prog-chip-sm new-chip" title="Brand new in ${state.selectedLevel}">✨ New: <strong>${stats.newCount}</strong> (${newPct}%)</span>
              <span class="prog-chip-sm review-chip" title="Repeated from earlier levels">🔄 Review: <strong>${stats.reviewCount}</strong> (${reviewPct}%)</span>
            </div>
          </div>
          <div class="compact-split-bar">
            <div class="split-fill-new" style="width: ${newPct}%;" title="${stats.newCount} New (${newPct}%)"></div>
            <div class="split-fill-review" style="width: ${reviewPct}%;" title="${stats.reviewCount} Review (${reviewPct}%)"></div>
          </div>
        `;
      }
    }
  }

  function updateFooterStats() {
    const el = document.getElementById('footer-stats');
    if (!el || !window.JLPT_DATA) return;
    const kCount = window.JLPT_DATA.kanji ? window.JLPT_DATA.kanji.length : 0;
    const vCount = window.JLPT_DATA.vocabulary ? window.JLPT_DATA.vocabulary.length : 0;
    const gCount = window.JLPT_DATA.grammar ? window.JLPT_DATA.grammar.length : 0;
    el.innerHTML = `<strong>${kCount}</strong> Kanji &bull; <strong>${vCount}</strong> Vocabulary &bull; <strong>${gCount}</strong> Grammar Points`;
  }

  // --- FILTERING ENGINE ---
  function matchLevel(item) {
    if (state.selectedLevel === 'ALL') return true;
    const itemLevels = item.levels || (item.level ? [item.level] : ['N5']);
    return itemLevels.includes(state.selectedLevel);
  }

  function matchOrigin(item) {
    if (state.originFilter === 'ALL' || state.selectedLevel === 'ALL') return true;
    const firstLevel = item.firstLevel || (item.levels ? item.levels[0] : 'N5');
    if (state.originFilter === 'NEW') {
      return firstLevel === state.selectedLevel;
    }
    if (state.originFilter === 'REVIEW') {
      return firstLevel !== state.selectedLevel && item.levels && item.levels.includes(state.selectedLevel);
    }
    return true;
  }

  function filterItems(items, searchFields = [], category = 'kanji') {
    const q = state.searchQuery.trim().toLowerCase();
    const catFilter = state.filters[category] || { book: 'ALL', chapter: 'ALL' };

    return items.filter(item => {
      // Filter by Level & Vocab Source
      if (category === 'vocabulary') {
        if (state.vocabTypeFilter === 'TEXTBOOK') {
          if (!item.isTextbookVocab) return false;
          if (state.selectedLevel !== 'ALL' && (!item.textbookLevels || !item.textbookLevels.includes(state.selectedLevel))) return false;
        } else if (state.vocabTypeFilter === 'COMPOUNDS') {
          if (!item.isKanjiCompound) return false;
          if (state.selectedLevel !== 'ALL' && (!item.compoundLevels || !item.compoundLevels.includes(state.selectedLevel))) return false;
        } else {
          if (!matchLevel(item)) return false;
        }
      } else {
        if (!matchLevel(item)) return false;
      }

      if (!matchOrigin(item)) return false;

      // Filter by selected Book
      let srcList = item.sources || [];
      if (category === 'vocabulary') {
        if (state.vocabTypeFilter === 'TEXTBOOK' && item.textbookSources && item.textbookSources.length > 0) {
          srcList = item.textbookSources;
        } else if (state.vocabTypeFilter === 'COMPOUNDS' && item.compoundSources && item.compoundSources.length > 0) {
          srcList = item.compoundSources;
        }
      }

      if (catFilter.book !== 'ALL') {
        const hasBook = Array.isArray(srcList) && srcList.some(s => s.book === catFilter.book);
        if (!hasBook) return false;
      }

      // Filter by selected Chapter / Week
      if (catFilter.chapter !== 'ALL') {
        const hasChapter = Array.isArray(srcList) && srcList.some(s => {
          if (catFilter.book !== 'ALL' && s.book !== catFilter.book) return false;
          const rawChap = s.chapter || s.lesson;
          return rawChap && (rawChap === catFilter.chapter || rawChap.startsWith(catFilter.chapter));
        });
        if (!hasChapter) return false;
      }

      if (!q) return true;
      
      const matchedField = searchFields.some(field => {
        const val = item[field];
        if (typeof val === 'string') return val.toLowerCase().includes(q);
        if (typeof val === 'number') return String(val) === q;
        if (Array.isArray(val)) {
          return val.some(v => typeof v === 'string' ? v.toLowerCase().includes(q) : JSON.stringify(v).toLowerCase().includes(q));
        }
        return false;
      });

      const matchedSource = Array.isArray(item.sources) && item.sources.some(s => 
        (s.book && s.book.toLowerCase().includes(q)) || 
        (s.chapter && s.chapter.toLowerCase().includes(q)) ||
        (s.notes && s.notes.toLowerCase().includes(q))
      );

      const matchedExamples = Array.isArray(item.examples) && item.examples.some(ex =>
        (ex.word && ex.word.toLowerCase().includes(q)) ||
        (ex.reading && ex.reading.toLowerCase().includes(q)) ||
        (ex.meaning && ex.meaning.toLowerCase().includes(q))
      );

      return matchedField || matchedSource || matchedExamples;
    });
  }

  // --- SCRIPT DISPLAY RENDERER (KANJI / HIRAGANA / PROGRESSIVE HYBRID) ---
  function renderVocabWordByMode(v) {
    const mode = state.vocabScriptMode;
    const word = v.word;
    const reading = v.reading || v.word;

    if (mode === 'hiragana') {
      return `<span class="vocab-word" title="Standard Kanji: ${word}">${reading}</span>`;
    }

    if (mode === 'progressive') {
      const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/g;
      const chars = Array.from(word);

      // Build progressive HTML
      let html = '';
      chars.forEach(ch => {
        if (kanjiRegex.test(ch)) {
          const kObj = window.JLPT_DATA.getKanjiByChar(ch);
          const isKnown = !!kObj;
          if (isKnown) {
            html += `<span class="learned-kanji-token" onclick="window.NihonHub.openKanjiModalByChar('${ch}')" title="Learned Kanji: ${ch} (${kObj.meaning} • ${kObj.firstLevel})">${ch}</span>`;
          } else {
            html += `<span class="kana-token">${ch}</span>`;
          }
        } else {
          html += `<span class="kana-token">${ch}</span>`;
        }
      });
      return `<span class="vocab-word">${html}</span>`;
    }

    // Default: Kanji View
    return `<span class="vocab-word">${word}</span>`;
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Navigation Tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    // Sidebar Drawer Toggle (Mobile / Tablet)
    const sidebar = document.getElementById('app-sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    function openSidebar() {
      if (sidebar) sidebar.classList.add('open');
      if (sidebarBackdrop) sidebarBackdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }

    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', openSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

    // Level selector pills
    document.querySelectorAll('.level-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.level-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.selectedLevel = e.currentTarget.getAttribute('data-level');
        
        const activeLevelText = document.getElementById('active-level-indicator-badge');
        if (activeLevelText) activeLevelText.textContent = state.selectedLevel;

        state.filters.kanji.chapter = 'ALL';
        state.filters.vocabulary.chapter = 'ALL';
        state.filters.grammar.chapter = 'ALL';

        buildFlashcardDeck();
        renderAll();
      });
    });

    // Origin / Scope filter pills (New vs Review)
    document.querySelectorAll('.origin-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.origin-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.originFilter = e.currentTarget.getAttribute('data-origin');
        renderActiveTab();
      });
    });

    // Furigana Toggle
    const furiganaToggle = document.getElementById('furigana-toggle');
    if (furiganaToggle) {
      furiganaToggle.checked = state.showFurigana;
      furiganaToggle.addEventListener('change', (e) => {
        state.showFurigana = e.target.checked;
        document.body.classList.toggle('hide-furigana', !state.showFurigana);
        savePreferences();
      });
    }
    if (!state.showFurigana) {
      document.body.classList.add('hide-furigana');
    }

    // Romaji Toggle
    const romajiToggle = document.getElementById('romaji-toggle');
    if (romajiToggle) {
      romajiToggle.checked = state.showRomaji;
      romajiToggle.addEventListener('change', (e) => {
        state.showRomaji = e.target.checked;
        document.body.classList.toggle('hide-romaji', !state.showRomaji);
        savePreferences();
      });
    }
    if (!state.showRomaji) {
      document.body.classList.add('hide-romaji');
    }

    // Hide English / Memory Recall Toggle
    const hideEnglishToggle = document.getElementById('hide-english-toggle');
    if (hideEnglishToggle) {
      hideEnglishToggle.checked = state.hideEnglish;
      hideEnglishToggle.addEventListener('change', (e) => {
        state.hideEnglish = e.target.checked;
        document.body.classList.toggle('hide-english', state.hideEnglish);
        savePreferences();
      });
    }
    if (state.hideEnglish) {
      document.body.classList.add('hide-english');
    }

    // Audio Speed Toggle
    const audioSpeedBtn = document.getElementById('audio-speed-btn');
    if (audioSpeedBtn) {
      audioSpeedBtn.addEventListener('click', toggleAudioSpeed);
      const isNormal = state.audioSpeed > 0.8;
      const speedIcon = document.getElementById('audio-speed-icon');
      const speedText = document.getElementById('audio-speed-text');
      if (speedIcon) speedIcon.textContent = isNormal ? '🐇' : '🐢';
      if (speedText) speedText.textContent = isNormal ? '1.0x Audio' : '0.75x Audio';
    }

    // 3-Way Script Display Mode Selector
    document.querySelectorAll('[data-script-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-script-mode]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.vocabScriptMode = e.currentTarget.getAttribute('data-script-mode');
        savePreferences();
        renderVocabulary();
      });
    });

    // Vocab Category Type Selector (All / Textbook / Compounds)
    document.querySelectorAll('[data-vocab-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-vocab-type]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.vocabTypeFilter = e.currentTarget.getAttribute('data-vocab-type');
        state.filters.vocabulary.book = 'ALL';
        state.filters.vocabulary.chapter = 'ALL';
        renderSourceFilter('vocabulary');
        renderVocabulary();
      });
    });

    // View Mode Toggle (Cards vs Table)
    document.querySelectorAll('[data-view-target]').forEach(wrapper => {
      const targetCat = wrapper.getAttribute('data-view-target');
      wrapper.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const mode = e.currentTarget.getAttribute('data-view');
          state.viewModes[targetCat] = mode;
          updateViewModeButtons(targetCat);
          savePreferences();
          if (targetCat === 'kanji') renderKanji();
          else if (targetCat === 'vocabulary') renderVocabulary();
          else if (targetCat === 'grammar') renderGrammar();
          else if (targetCat === 'bookmarks') renderBookmarks();
        });
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Global Search
    const searchInput = document.getElementById('global-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (searchClearBtn) {
          searchClearBtn.classList.toggle('hidden', !state.searchQuery);
        }
        renderActiveTab();
      });
    }
    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          state.searchQuery = '';
          searchClearBtn.classList.add('hidden');
          searchInput.focus();
          renderActiveTab();
        }
      });
    }

    // Flashcard category selector
    document.querySelectorAll('.fc-category-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.fc-category-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.flashcards.category = e.currentTarget.getAttribute('data-category');
        state.flashcards.book = 'ALL';
        state.flashcards.chapter = 'ALL';
        renderFlashcardSourceFilter();
        buildFlashcardDeck();
        renderFlashcard();
      });
    });

    // Flashcard status pills (All / Unmastered / Mastered)
    document.querySelectorAll('.fc-status-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.fc-status-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.flashcards.status = e.currentTarget.getAttribute('data-fc-status');
        buildFlashcardDeck();
        renderFlashcard();
      });
    });

    // Flashcard textbook select
    const fcBookSelect = document.getElementById('fc-book-select');
    if (fcBookSelect) {
      fcBookSelect.addEventListener('change', (e) => {
        state.flashcards.book = e.target.value;
        state.flashcards.chapter = 'ALL';
        renderFlashcardSourceFilter();
        buildFlashcardDeck();
        renderFlashcard();
      });
    }

    // Flashcard jump controls
    const fcJumpBtn = document.getElementById('fc-jump-btn');
    const fcJumpInput = document.getElementById('fc-jump-input');
    if (fcJumpBtn && fcJumpInput) {
      fcJumpBtn.addEventListener('click', () => {
        const val = parseInt(fcJumpInput.value, 10);
        if (!isNaN(val)) jumpToFlashcard(val - 1);
      });
      fcJumpInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = parseInt(fcJumpInput.value, 10);
          if (!isNaN(val)) jumpToFlashcard(val - 1);
        }
      });
    }

    // Flashcard action buttons
    const fcCard = document.getElementById('flashcard-element');
    if (fcCard) fcCard.addEventListener('click', flipFlashcard);
    const fcPrev = document.getElementById('fc-prev-btn');
    if (fcPrev) fcPrev.addEventListener('click', prevFlashcard);
    const fcNext = document.getElementById('fc-next-btn');
    if (fcNext) fcNext.addEventListener('click', nextFlashcard);
    const fcFlip = document.getElementById('fc-flip-btn');
    if (fcFlip) fcFlip.addEventListener('click', flipFlashcard);
    const fcShuffle = document.getElementById('fc-shuffle-btn');
    if (fcShuffle) fcShuffle.addEventListener('click', shuffleFlashcards);
    const fcQuickAudio = document.getElementById('fc-quick-audio-btn');
    if (fcQuickAudio) fcQuickAudio.addEventListener('click', speakCurrentFlashcard);
    const fcMasteryBtn = document.getElementById('fc-toggle-mastery-btn');
    if (fcMasteryBtn) fcMasteryBtn.addEventListener('click', toggleMasteryCurrentFlashcard);

    // Modal Close
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (state.currentTab === 'flashcards') {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          flipFlashcard();
        } else if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') {
          nextFlashcard();
        } else if (e.key === 'ArrowLeft' || e.key === 'k' || e.key === 'K') {
          prevFlashcard();
        } else if (e.key === 'a' || e.key === 'A') {
          speakCurrentFlashcard();
        } else if (e.key === 'm' || e.key === 'M') {
          toggleMasteryCurrentFlashcard();
        } else if (e.key === 'b' || e.key === 'B') {
          toggleBookmarkCurrentFlashcard();
        } else if (e.key === 's' || e.key === 'S') {
          shuffleFlashcards();
        }
      }
    });

    // Delegated Clicks
    document.addEventListener('click', (e) => {
      const audioBtn = e.target.closest('[data-speak]');
      if (audioBtn) {
        e.stopPropagation();
        speakJapanese(audioBtn.getAttribute('data-speak'));
        return;
      }

      const bookmarkBtn = e.target.closest('[data-bookmark-id]');
      if (bookmarkBtn) {
        e.stopPropagation();
        toggleBookmark(bookmarkBtn.getAttribute('data-bookmark-id'));
        return;
      }

      const masteryBtn = e.target.closest('[data-mastery-id]');
      if (masteryBtn) {
        e.stopPropagation();
        toggleMastery(masteryBtn.getAttribute('data-mastery-id'));
        return;
      }

      const kanjiCard = e.target.closest('[data-kanji-modal-id]');
      if (kanjiCard) {
        const kanjiId = kanjiCard.getAttribute('data-kanji-modal-id');
        openKanjiModal(kanjiId);
        return;
      }
    });

    // Window Scroll Fallback for fast scrolling
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      let isScrollThrottled = false;
      window.addEventListener('scroll', () => {
        if (isScrollThrottled) return;
        isScrollThrottled = true;
        setTimeout(() => { isScrollThrottled = false; }, 120);

        if ((window.innerHeight + (window.scrollY || 0)) >= ((document.body ? document.body.offsetHeight : 1000) - 500)) {
          const activeCat = state.currentTab === 'vocab' ? 'vocabulary' : state.currentTab;
          if (scrollState[activeCat]) {
            loadNextChunk(activeCat);
          }
        }
      }, { passive: true });
    }
  }

  // --- TAB SWITCHING ---
  function switchTab(tabId) {
    state.currentTab = tabId;
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });
    renderActiveTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderAll() {
    updateLevelProgressionBanner();
    updateFooterStats();
    updateMasteryHeaderStatus();
    renderSourceFilter('kanji');
    renderKanji();
    renderSourceFilter('vocabulary');
    renderVocabulary();
    renderSourceFilter('grammar');
    renderGrammar();
    renderKana();
    renderBookmarks();
    renderFlashcardSourceFilter();
    buildFlashcardDeck();
    renderFlashcard();
  }

  function renderActiveTab() {
    updateLevelProgressionBanner();
    updateFooterStats();
    updateMasteryHeaderStatus();
    switch (state.currentTab) {
      case 'kanji':
        renderSourceFilter('kanji');
        renderKanji();
        break;
      case 'vocab':
        renderSourceFilter('vocabulary');
        renderVocabulary();
        break;
      case 'grammar':
        renderSourceFilter('grammar');
        renderGrammar();
        break;
      case 'flashcards':
        renderFlashcardSourceFilter();
        buildFlashcardDeck();
        renderFlashcard();
        break;
      case 'kana': renderKana(); break;
      case 'bookmarks': renderBookmarks(); break;
    }
  }

  // --- PROGRESSIVE INFINITE SCROLL ENGINE (HIGH PERFORMANCE) ---
  const CHUNK_SIZE = 30; // Loads in batches of 30 for < 5ms instant responsiveness

  const scrollState = {
    kanji: { items: [], renderedCount: 0, containerId: 'kanji-grid', sentinelId: 'kanji-sentinel' },
    vocabulary: { items: [], renderedCount: 0, containerId: 'vocab-list', sentinelId: 'vocab-sentinel' },
    grammar: { items: [], renderedCount: 0, containerId: 'grammar-list', sentinelId: 'grammar-sentinel' },
    bookmarks: { items: [], renderedCount: 0, containerId: 'bookmarks-list', sentinelId: 'bookmarks-sentinel' }
  };

  const TABLE_HEADERS = {
    kanji: `
      <thead>
        <tr>
          <th style="width: 50px;">#</th>
          <th style="width: 100px;">Kanji</th>
          <th style="width: 220px;">Readings (ON / KUN)</th>
          <th>Meaning</th>
          <th style="width: 140px;">Level & Scope</th>
          <th style="width: 160px;">Textbook / Lesson</th>
          <th style="width: 130px; text-align: right;">Actions</th>
        </tr>
      </thead>
    `,
    vocabulary: `
      <thead>
        <tr>
          <th style="width: 50px;">#</th>
          <th style="width: 200px;">Word & Reading</th>
          <th>Meaning & Example</th>
          <th style="width: 170px;">Type & Anatomy</th>
          <th style="width: 130px;">Level</th>
          <th style="width: 160px;">Textbook / Source</th>
          <th style="width: 100px; text-align: right;">Actions</th>
        </tr>
      </thead>
    `,
    grammar: `
      <thead>
        <tr>
          <th style="width: 50px;">#</th>
          <th style="width: 200px;">Grammar Pattern</th>
          <th>Meaning & Explanation</th>
          <th style="width: 200px;">Structure</th>
          <th style="width: 130px;">Level</th>
          <th style="width: 150px;">Source</th>
          <th style="width: 100px; text-align: right;">Actions</th>
        </tr>
      </thead>
    `,
    bookmarks: `
      <thead>
        <tr>
          <th style="width: 50px;">#</th>
          <th style="width: 90px;">Type</th>
          <th style="width: 200px;">Item & Reading</th>
          <th>Meaning</th>
          <th style="width: 110px; text-align: right;">Actions</th>
        </tr>
      </thead>
    `
  };

  function updateViewModeButtons(category) {
    const wrapper = document.querySelector(`[data-view-target="${category}"]`);
    if (!wrapper) return;
    const currentMode = state.viewModes[category] || 'cards';
    wrapper.querySelectorAll('[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === currentMode);
    });
  }

  const CARD_RENDERERS = {
    kanji: renderKanjiCardHtml,
    vocabulary: renderVocabCardHtml,
    grammar: renderGrammarCardHtml,
    bookmarks: renderBookmarkCardHtml
  };

  const TABLE_RENDERERS = {
    kanji: renderKanjiTableRowHtml,
    vocabulary: renderVocabTableRowHtml,
    grammar: renderGrammarTableRowHtml,
    bookmarks: renderBookmarkTableRowHtml
  };

  let scrollObserver = null;

  function initScrollObserver() {
    if (typeof IntersectionObserver === 'undefined') return;
    if (scrollObserver) scrollObserver.disconnect();

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const category = entry.target.getAttribute('data-scroll-category');
          if (category && scrollState[category]) {
            loadNextChunk(category);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '400px 0px', // Pre-fetch next batch 400px before reaching bottom
      threshold: 0.01
    });
  }

  function loadNextChunk(category) {
    const s = scrollState[category];
    if (!s) return;
    const isTable = (state.viewModes[category] === 'table');
    const container = isTable 
      ? document.getElementById(`${category}-table-body`) 
      : document.getElementById(s.containerId);
    if (!container) return;

    // Remove existing sentinel element before appending new chunk
    const existingSentinel = document.getElementById(s.sentinelId);
    if (existingSentinel) {
      if (scrollObserver) scrollObserver.unobserve(existingSentinel);
      if (typeof existingSentinel.remove === 'function') {
        existingSentinel.remove();
      }
    }

    const nextItems = s.items.slice(s.renderedCount, s.renderedCount + CHUNK_SIZE);
    const renderer = isTable ? TABLE_RENDERERS[category] : CARD_RENDERERS[category];

    if (nextItems.length === 0) {
      if (s.renderedCount > CHUNK_SIZE) {
        const existingNotice = container.querySelector('.all-loaded-indicator');
        if (!existingNotice) {
          if (isTable) {
            const endRow = document.createElement('tr');
            endRow.innerHTML = `<td colspan="10" class="all-loaded-indicator">✨ All ${s.items.length} items loaded</td>`;
            container.appendChild(endRow);
          } else {
            const endNotice = document.createElement('div');
            endNotice.className = 'all-loaded-indicator';
            endNotice.innerHTML = `✨ All ${s.items.length} items loaded`;
            container.appendChild(endNotice);
          }
        }
      }
      return;
    }

    const htmlChunk = nextItems.map((item, idx) => renderer(item, s.renderedCount + idx + 1)).join('');
    container.insertAdjacentHTML('beforeend', htmlChunk);
    s.renderedCount += nextItems.length;

    // If more items remain, append a new sentinel and observe it
    if (s.renderedCount < s.items.length) {
      if (isTable) {
        const sentinelRow = document.createElement('tr');
        sentinelRow.id = s.sentinelId;
        sentinelRow.setAttribute('data-scroll-category', category);
        sentinelRow.innerHTML = `<td colspan="10" class="table-sentinel-cell"><div class="scroll-loading-spinner" title="Loading more..."></div></td>`;
        container.appendChild(sentinelRow);
        if (scrollObserver) scrollObserver.observe(sentinelRow);
      } else {
        const sentinel = document.createElement('div');
        sentinel.id = s.sentinelId;
        sentinel.className = 'scroll-sentinel';
        sentinel.setAttribute('data-scroll-category', category);
        sentinel.innerHTML = `<div class="scroll-loading-spinner" title="Loading more..."></div>`;
        container.appendChild(sentinel);
        if (scrollObserver) scrollObserver.observe(sentinel);
      }
    }
  }

  function renderCategoryWithProgressiveScroll(category, items, emptyMessage) {
    const s = scrollState[category];
    if (!s) return;
    const container = document.getElementById(s.containerId);
    if (!container) return;

    updateViewModeButtons(category);
    const isTable = (state.viewModes[category] === 'table');

    s.items = items;
    s.renderedCount = 0;
    container.innerHTML = '';

    if (isTable) {
      container.classList.add('table-view-active');
    } else {
      container.classList.remove('table-view-active');
    }

    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state card-glass" style="grid-column: 1 / -1;"><p>${emptyMessage}</p></div>`;
      return;
    }

    if (isTable) {
      container.innerHTML = `
        <div class="study-table-responsive card-glass">
          <table class="study-table">
            ${TABLE_HEADERS[category] || ''}
            <tbody id="${category}-table-body"></tbody>
          </table>
        </div>
      `;
    }

    // Render first chunk immediately (< 5ms)
    loadNextChunk(category);
  }

  // --- 1. KANJI MATRIX RENDERER ---
  function renderKanjiCardHtml(k, sNo) {
    const isBookmarked = state.bookmarks.has(k.id);
    const isMastered = state.mastered.has(k.id);
    const sourceInfo = k.sources && k.sources[0] ? k.sources[0] : null;
    const chapterBadge = sourceInfo ? (sourceInfo.chapter || sourceInfo.lesson || '') : '';
    const notes = sourceInfo && sourceInfo.notes ? sourceInfo.notes : '';
    const compoundCount = k.examples ? k.examples.length : 0;

    return `
      <div class="kanji-card card-glass ${isMastered ? 'mastered-card' : ''}" data-kanji-modal-id="${k.id}">
        <div class="kanji-card-top">
          <div class="kanji-badges">
            ${sNo ? `<span class="sno-badge" title="Card #${sNo}">#${sNo}</span>` : ''}
            ${renderLevelPills(k.levels)}
            ${renderOriginBadge(k)}
          </div>
          <div class="kanji-actions">
            <button class="mastery-btn ${isMastered ? 'is-mastered' : ''}" data-mastery-id="${k.id}" title="${isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}">
              ${isMastered ? '✓' : '○'}
            </button>
            <button class="action-btn" data-speak="${k.char}" title="Listen pronunciation">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${k.id}" title="Save bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="kanji-character-big">${k.char}</div>

        <div class="kanji-readings-row">
          ${k.onyomi ? `<div class="kanji-reading"><span class="r-label">ON</span><span class="r-val">${k.onyomi}</span></div>` : ''}
          ${k.kunyomi ? `<div class="kanji-reading"><span class="r-label">KUN</span><span class="r-val">${k.kunyomi}</span></div>` : ''}
        </div>

        <div class="kanji-meaning">${k.meaning}</div>

        ${chapterBadge ? `
          <div class="kanji-source-tag" title="${notes}">
            ${UI_ICONS.book} ${chapterBadge} ${notes ? `• ${notes}` : ''}
          </div>
        ` : ''}

        <div class="kanji-card-footer">
          <span class="example-count" onclick="event.stopPropagation(); window.NihonHub.showCompoundsForKanji('${k.char}')" title="Click to view all compound words with ${k.char}" style="cursor: pointer; text-decoration: underline;">
            ${compoundCount} compound words &rarr;
          </span>
          <span class="open-detail-link">Details &rarr;</span>
        </div>
      </div>
    `;
  }

  function renderKanjiTableRowHtml(k, sNo) {
    const isBookmarked = state.bookmarks.has(k.id);
    const isMastered = state.mastered.has(k.id);
    const sourceInfo = k.sources && k.sources[0] ? k.sources[0] : null;
    const chapterBadge = sourceInfo ? (sourceInfo.chapter || sourceInfo.lesson || '') : '';
    const notes = sourceInfo && sourceInfo.notes ? sourceInfo.notes : '';

    return `
      <tr class="study-table-row ${isMastered ? 'mastered-row' : ''}" data-kanji-modal-id="${k.id}">
        <td class="col-sno"><span class="sno-badge">#${sNo}</span></td>
        <td class="col-main-char">
          <div class="t-char-box">
            <span class="t-char" onclick="window.NihonHub.openKanjiModal('${k.id}')" title="Click to view details">${k.char}</span>
            <button class="mini-audio-btn" data-speak="${k.char}" title="Listen pronunciation">${UI_ICONS.volume}</button>
          </div>
        </td>
        <td class="col-readings">
          <div class="t-readings-wrap">
            ${k.onyomi ? `<div><span class="r-label">ON:</span> <span class="r-val">${k.onyomi}</span></div>` : ''}
            ${k.kunyomi ? `<div><span class="r-label">KUN:</span> <span class="r-val">${k.kunyomi}</span></div>` : ''}
          </div>
        </td>
        <td class="col-meaning">
          <div class="t-meaning">${k.meaning}</div>
        </td>
        <td class="col-badges">
          <div class="t-badges-wrap">
            ${renderLevelPills(k.levels)}
            ${renderOriginBadge(k)}
          </div>
        </td>
        <td class="col-source">
          ${chapterBadge ? `
            <div class="t-source-tag" title="${notes}">
              <span>${chapterBadge}</span>
              ${notes ? `<small>${notes}</small>` : ''}
            </div>
          ` : '<span class="text-muted">—</span>'}
        </td>
        <td class="col-actions">
          <div class="t-actions-wrap" onclick="event.stopPropagation()">
            <button class="mastery-btn ${isMastered ? 'is-mastered' : ''}" data-mastery-id="${k.id}" title="${isMastered ? 'Marked Mastered' : 'Mark Mastered'}">
              ${isMastered ? '✓' : '○'}
            </button>
            <button class="action-btn" data-bookmark-id="${k.id}" title="Bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
            <span class="t-details-btn" onclick="window.NihonHub.openKanjiModal('${k.id}')" title="Details">Details &rarr;</span>
          </div>
        </td>
      </tr>
    `;
  }

  function renderKanji() {
    const grid = document.getElementById('kanji-grid');
    const countTag = document.getElementById('kanji-count');
    const breakdownTag = document.getElementById('kanji-origin-breakdown');
    if (!grid) return;

    const items = filterItems(window.JLPT_DATA.kanji, ['char', 'meaning', 'onyomi', 'kunyomi', 'radical'], 'kanji');

    if (countTag) {
      countTag.textContent = `${items.length} Kanji displayed`;
    }

    if (breakdownTag && window.JLPT_DATA.getLevelStats) {
      const stats = window.JLPT_DATA.getLevelStats('kanji', state.selectedLevel);
      if (state.selectedLevel === 'ALL') {
        breakdownTag.textContent = `(${stats.total} total across all levels)`;
      } else {
        breakdownTag.innerHTML = `&bull; <strong>${stats.newCount}</strong> New in ${state.selectedLevel} &bull; <strong>${stats.reviewCount}</strong> Review from lower levels`;
      }
    }

    renderCategoryWithProgressiveScroll('kanji', items, `No Kanji found matching the current Level (${state.selectedLevel}), Textbook, and Scope filters.`);
  }

  // --- ZEN STUDY KANJI MODAL ---
  let modalCompoundFilter = 'ALL';

  function renderModalExamples(examples, selectedLevel) {
    const list = document.getElementById('modal-examples-container');
    if (!list) return;

    let filtered = examples;
    if (modalCompoundFilter !== 'ALL') {
      filtered = examples.filter(ex => {
        const lvls = ex.levels || [ex.level || 'N2'];
        return lvls.includes(modalCompoundFilter);
      });
    }

    if (filtered.length === 0) {
      list.innerHTML = `<div class="modal-empty-compounds">No compound words found for this level.</div>`;
      return;
    }

    list.innerHTML = filtered.map(ex => {
      const exLevels = ex.levels || [ex.level || 'N2'];
      const firstLvl = ex.firstLevel || exLevels[0] || 'N2';
      const isMultiLevel = exLevels.length > 1;

      return `
        <div class="zen-compound-item">
          <div class="zen-comp-left">
            <div class="zen-comp-word-row">
              <span class="zen-comp-word">${ex.word}</span>
              <span class="zen-comp-reading">【${ex.reading}】</span>
              <button class="mini-audio-btn" data-speak="${ex.word}" title="Listen">${UI_ICONS.volume}</button>
            </div>
            <div class="zen-comp-meta">
              ${renderLevelPills(exLevels)}
              ${isMultiLevel ? '<span class="origin-tag review">🔄 Multi-Level</span>' : ''}
            </div>
          </div>
          <div class="zen-comp-meaning">${ex.meaning}</div>
        </div>
      `;
    }).join('');
  }

  function openKanjiModal(kanjiId) {
    const kanji = window.JLPT_DATA.kanji.find(k => k.id === kanjiId);
    if (!kanji) return;

    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalBody = document.getElementById('kanji-modal-body');
    if (!modalBackdrop || !modalBody) return;

    const isBookmarked = state.bookmarks.has(kanji.id);
    const isMastered = state.mastered.has(kanji.id);
    const examples = kanji.examples || [];

    const levelCounts = {};
    examples.forEach(ex => {
      const lvls = ex.levels || [ex.level || 'N2'];
      lvls.forEach(l => {
        levelCounts[l] = (levelCounts[l] || 0) + 1;
      });
    });

    const distinctLevels = Object.keys(levelCounts).sort();
    modalCompoundFilter = 'ALL';

    modalBody.innerHTML = `
      <div class="zen-modal-container">
        <!-- Hero Header -->
        <div class="zen-hero-header">
          <div class="zen-char-box">
            <span class="zen-kanji-char">${kanji.char}</span>
            <button class="zen-audio-btn" data-speak="${kanji.char}" title="Listen Kanji Pronunciation">
              ${UI_ICONS.volume} Speak
            </button>
          </div>
          
          <div class="zen-header-info">
            <div class="zen-meta-row">
              ${renderLevelPills(kanji.levels)}
              ${renderOriginBadge(kanji)}
              <span class="zen-stat-pill">${kanji.strokes ? `${kanji.strokes} Strokes` : ''}</span>
              ${kanji.radical ? `<span class="zen-stat-pill">Radical: ${kanji.radical}</span>` : ''}
            </div>
            
            <h2 class="zen-meaning-title">${kanji.meaning}</h2>

            <!-- Clean Readings Bar -->
            <div class="zen-readings-bar">
              <div class="zen-reading-chip">
                <span class="z-label">ON</span>
                <span class="z-val">${kanji.onyomi || '—'}</span>
              </div>
              <div class="zen-reading-chip">
                <span class="z-label">KUN</span>
                <span class="z-val">${kanji.kunyomi || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Collapsible Textbook Lessons (Cleaner, No Clutter!) -->
        ${kanji.sources && kanji.sources.length > 0 ? `
          <details class="zen-textbook-drawer">
            <summary class="zen-drawer-summary">
              <span>📖 Textbook Lessons & Context (${kanji.sources.length} Sources)</span>
              <span class="drawer-arrow">▾</span>
            </summary>
            <div class="zen-drawer-body">
              ${kanji.sources.map(s => `
                <div class="zen-source-entry">
                  ${UI_ICONS.book} <strong>${s.book}</strong> &mdash; ${s.chapter || s.lesson || ''} ${s.notes ? `(${s.notes})` : ''}
                </div>
              `).join('')}
            </div>
          </details>
        ` : ''}

        <!-- Clean Target Compounds Section -->
        <div class="zen-compounds-section">
          <div class="zen-compounds-header">
            <div class="zen-comp-title">
              <span>Target Compounds (熟語)</span>
              <span class="count-chip">${examples.length} Words</span>
            </div>

            ${distinctLevels.length > 1 ? `
              <div class="zen-filter-pills">
                <button class="modal-filter-btn active" data-modal-filter="ALL">All (${examples.length})</button>
                ${distinctLevels.map(lvl => `
                  <button class="modal-filter-btn" data-modal-filter="${lvl}">
                    ${lvl} (${levelCounts[lvl]})
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div id="modal-examples-container" class="zen-examples-list"></div>
        </div>

        <!-- Clean Footer Actions -->
        <div class="zen-modal-footer">
          <button class="btn-primary-sm" onclick="window.NihonHub.showCompoundsForKanji('${kanji.char}')">
            ${UI_ICONS.search} View in Vocab Vault &rarr;
          </button>
          <div class="zen-footer-right">
            <button class="btn-secondary-sm" data-mastery-id="${kanji.id}">
              ${isMastered ? '✓ Mastered' : 'Mark Mastered'}
            </button>
            <button class="btn-secondary-sm" data-bookmark-id="${kanji.id}">
              ${isBookmarked ? `${UI_ICONS.starFilled} Bookmarked` : `${UI_ICONS.starOutline} Save`}
            </button>
          </div>
        </div>
      </div>
    `;

    renderModalExamples(examples, state.selectedLevel);

    modalBody.querySelectorAll('[data-modal-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        modalBody.querySelectorAll('[data-modal-filter]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        modalCompoundFilter = e.currentTarget.getAttribute('data-modal-filter');
        renderModalExamples(examples, state.selectedLevel);
      });
    });

    modalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function openKanjiModalByChar(char) {
    const k = window.JLPT_DATA.getKanjiByChar(char);
    if (k) {
      openKanjiModal(k.id);
    }
  }

  function closeModal() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // --- 2. VOCABULARY RENDERER (UNIFIED & 3-WAY SCRIPT) ---
  // --- 2. VOCABULARY RENDERER (UNIFIED & 3-WAY SCRIPT) ---
  function renderVocabCardHtml(v, sNo) {
    const isBookmarked = state.bookmarks.has(v.id);
    const isMastered = state.mastered.has(v.id);
    const components = v.kanjiComponents || [];

    return `
      <div class="vocab-card card-glass ${isMastered ? 'mastered-card' : ''}">
        <div class="vocab-top">
          <div class="vocab-badges">
            ${sNo ? `<span class="sno-badge" title="Card #${sNo}">#${sNo}</span>` : ''}
            ${renderLevelPills(v.levels || [v.level])}
            ${renderOriginBadge(v)}
            ${v.isTextbookVocab ? '<span class="source-pill badge-textbook" title="Extracted from textbook chapters/index">📚 Textbook Vocab</span>' : ''}
            ${v.isKanjiCompound ? '<span class="source-pill badge-compound" title="Learned from Kanji compound examples">🈁 Kanji Compound</span>' : ''}
          </div>
          <div class="vocab-actions">
            <button class="mastery-btn ${isMastered ? 'is-mastered' : ''}" data-mastery-id="${v.id}" title="${isMastered ? 'Marked Mastered' : 'Mark Mastered'}">
              ${isMastered ? '✓' : '○'}
            </button>
            <button class="action-btn" data-speak="${v.word}" title="Listen">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${v.id}" title="Bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="vocab-main">
          ${renderVocabWordByMode(v)}
          ${state.vocabScriptMode !== 'hiragana' ? `<span class="vocab-reading">【${v.reading}】</span>` : ''}
        </div>

        ${v.romaji ? `<div class="vocab-romaji">${v.romaji}</div>` : ''}
        <div class="vocab-meaning">${v.meaning || ''}</div>

        ${components.length > 0 ? `
          <div class="kanji-anatomy-section">
            <div class="kanji-anatomy-header">🧩 Kanji Building Blocks:</div>
            <div class="kanji-anatomy-chips">
              ${components.map(comp => `
                <div class="kanji-building-block" onclick="window.NihonHub.openKanjiModalByChar('${comp.char}')" title="Click to inspect Kanji ${comp.char} (${comp.meaning})">
                  <span class="block-char">${comp.char}</span>
                  <span class="block-meaning">${comp.meaning}</span>
                  <span class="block-level">${comp.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${v.example ? `
          <div class="vocab-example-box">
            <p class="vocab-ex-ja">${parseFurigana(v.example.furigana || v.example.ja)}</p>
            <p class="vocab-ex-en">${v.example.en || ''}</p>
          </div>
        ` : ''}

        ${renderSourcesHtml(v.sources)}
      </div>
    `;
  }

  function renderVocabTableRowHtml(v, sNo) {
    const isBookmarked = state.bookmarks.has(v.id);
    const isMastered = state.mastered.has(v.id);
    const components = v.kanjiComponents || [];
    const sourceInfo = v.sources && v.sources[0] ? v.sources[0] : null;
    const chapterBadge = sourceInfo ? (sourceInfo.chapter || sourceInfo.lesson || sourceInfo.book || '') : '';

    return `
      <tr class="study-table-row ${isMastered ? 'mastered-row' : ''}">
        <td class="col-sno"><span class="sno-badge">#${sNo}</span></td>
        <td class="col-vocab-word">
          <div class="t-vocab-main">
            <div class="t-word-row">
              <span class="t-vocab-text">${renderVocabWordByMode(v)}</span>
              <button class="mini-audio-btn" data-speak="${v.word}" title="Listen">${UI_ICONS.volume}</button>
            </div>
            ${state.vocabScriptMode !== 'hiragana' ? `<span class="t-reading">【${v.reading}】</span>` : ''}
            ${v.romaji ? `<span class="t-romaji">${v.romaji}</span>` : ''}
          </div>
        </td>
        <td class="col-meaning">
          <div class="t-meaning">${v.meaning || ''}</div>
          ${v.example ? `
            <div class="t-example-snippet">
              <div class="t-ex-ja">${parseFurigana(v.example.furigana || v.example.ja)}</div>
              <div class="t-ex-en">${v.example.en || ''}</div>
            </div>
          ` : ''}
        </td>
        <td class="col-anatomy">
          <div class="t-anatomy-wrap">
            ${v.isTextbookVocab ? '<span class="source-pill badge-textbook">📚 Textbook</span>' : ''}
            ${v.isKanjiCompound ? '<span class="source-pill badge-compound">🈁 Compound</span>' : ''}
            ${components.length > 0 ? `
              <div class="t-mini-blocks">
                ${components.map(comp => `
                  <span class="t-mini-block" onclick="window.NihonHub.openKanjiModalByChar('${comp.char}')" title="${comp.char}: ${comp.meaning}">
                    ${comp.char}
                  </span>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </td>
        <td class="col-badges">
          <div class="t-badges-wrap">
            ${renderLevelPills(v.levels || [v.level])}
            ${renderOriginBadge(v)}
          </div>
        </td>
        <td class="col-source">
          ${chapterBadge ? `<div class="t-source-tag">${chapterBadge}</div>` : '<span class="text-muted">—</span>'}
        </td>
        <td class="col-actions">
          <div class="t-actions-wrap">
            <button class="mastery-btn ${isMastered ? 'is-mastered' : ''}" data-mastery-id="${v.id}" title="${isMastered ? 'Marked Mastered' : 'Mark Mastered'}">
              ${isMastered ? '✓' : '○'}
            </button>
            <button class="action-btn" data-bookmark-id="${v.id}" title="Bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderVocabulary() {
    const list = document.getElementById('vocab-list');
    const countTag = document.getElementById('vocab-count');
    const breakdownTag = document.getElementById('vocab-origin-breakdown');
    if (!list) return;

    // Update pill badge numbers for currently active level
    if (window.JLPT_DATA.getVocabStats) {
      const vStats = window.JLPT_DATA.getVocabStats(state.selectedLevel);
      const btnAll = document.getElementById('vtype-count-all');
      const btnTb = document.getElementById('vtype-count-textbook');
      const btnCmp = document.getElementById('vtype-count-compounds');
      if (btnAll) btnAll.textContent = vStats.total;
      if (btnTb) btnTb.textContent = vStats.textbookCount;
      if (btnCmp) btnCmp.textContent = vStats.compoundsCount;
    }

    const items = filterItems(window.JLPT_DATA.vocabulary, ['word', 'reading', 'romaji', 'meaning'], 'vocabulary');

    const filterTypeName = state.vocabTypeFilter === 'TEXTBOOK' ? 'Textbook' : state.vocabTypeFilter === 'COMPOUNDS' ? 'Kanji Compound' : 'Total';
    if (countTag) countTag.textContent = `${items.length} ${filterTypeName} Words displayed`;

    if (breakdownTag && window.JLPT_DATA.getVocabStats) {
      const vStats = window.JLPT_DATA.getVocabStats(state.selectedLevel);
      if (state.selectedLevel === 'ALL') {
        breakdownTag.innerHTML = `&bull; <strong>${vStats.textbookCount}</strong> Textbook Vocab &bull; <strong>${vStats.compoundsCount}</strong> Kanji Compounds &bull; <strong>${vStats.total}</strong> Total`;
      } else {
        breakdownTag.innerHTML = `&bull; <strong>${vStats.textbookCount}</strong> Textbook Vocab in ${state.selectedLevel} &bull; <strong>${vStats.compoundsCount}</strong> Kanji Compounds in ${state.selectedLevel}`;
      }
    }

    renderCategoryWithProgressiveScroll('vocabulary', items, 'No vocabulary words found matching current filters.');
  }

  // --- 3. GRAMMAR RENDERER ---
  function renderGrammarCardHtml(g, sNo) {
    const isBookmarked = state.bookmarks.has(g.id);
    const isMastered = state.mastered.has(g.id);
    return `
      <div class="grammar-card card-glass ${isMastered ? 'mastered-card' : ''}">
        <div class="grammar-top">
          <div class="grammar-badges">
            ${sNo ? `<span class="sno-badge" title="Card #${sNo}">#${sNo}</span>` : ''}
            ${renderLevelPills(g.levels || [g.level])}
            ${renderOriginBadge(g)}
          </div>
          <div class="grammar-actions">
            <button class="mastery-btn ${isMastered ? 'is-mastered' : ''}" data-mastery-id="${g.id}" title="${isMastered ? 'Marked Mastered' : 'Mark Mastered'}">
              ${isMastered ? '✓' : '○'}
            </button>
            <button class="action-btn" data-speak="${g.pattern}" title="Listen">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${g.id}" title="Bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="grammar-pattern">${g.pattern}</div>
        <div class="grammar-meaning">${g.meaning}</div>

        ${g.structure ? `
          <div class="grammar-structure-box">
            <span class="struct-label">Structure:</span>
            <code>${g.structure}</code>
          </div>
        ` : ''}

        <div class="grammar-explanation">${g.explanation || ''}</div>

        ${Array.isArray(g.examples) && g.examples.length > 0 ? `
          <div class="grammar-examples-list">
            <div class="ex-label">Example Sentences:</div>
            ${g.examples.map(ex => `
              <div class="grammar-ex-item">
                <p class="g-ja">${parseFurigana(ex.furigana || ex.ja)} <button class="mini-audio-btn" data-speak="${ex.ja}" title="Listen">${UI_ICONS.volume}</button></p>
                <p class="g-en">${ex.en}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${renderSourcesHtml(g.sources)}
      </div>
    `;
  }

  function renderGrammarTableRowHtml(g, sNo) {
    const isBookmarked = state.bookmarks.has(g.id);
    const isMastered = state.mastered.has(g.id);
    const sourceInfo = g.sources && g.sources[0] ? g.sources[0] : null;
    const chapterBadge = sourceInfo ? (sourceInfo.chapter || sourceInfo.lesson || sourceInfo.book || '') : '';

    return `
      <tr class="study-table-row ${isMastered ? 'mastered-row' : ''}">
        <td class="col-sno"><span class="sno-badge">#${sNo}</span></td>
        <td class="col-grammar-pattern">
          <div class="t-pattern-box">
            <span class="t-pattern">${g.pattern}</span>
            <button class="mini-audio-btn" data-speak="${g.pattern}" title="Listen">${UI_ICONS.volume}</button>
          </div>
        </td>
        <td class="col-meaning">
          <div class="t-meaning"><strong>${g.meaning}</strong></div>
          ${g.explanation ? `<div class="t-grammar-expl">${g.explanation}</div>` : ''}
        </td>
        <td class="col-structure">
          ${g.structure ? `<code class="t-structure-code">${g.structure}</code>` : '<span class="text-muted">—</span>'}
        </td>
        <td class="col-badges">
          <div class="t-badges-wrap">
            ${renderLevelPills(g.levels || [g.level])}
            ${renderOriginBadge(g)}
          </div>
        </td>
        <td class="col-source">
          ${chapterBadge ? `<div class="t-source-tag">${chapterBadge}</div>` : '<span class="text-muted">—</span>'}
        </td>
        <td class="col-actions">
          <div class="t-actions-wrap">
            <button class="mastery-btn ${isMastered ? 'is-mastered' : ''}" data-mastery-id="${g.id}" title="${isMastered ? 'Marked Mastered' : 'Mark Mastered'}">
              ${isMastered ? '✓' : '○'}
            </button>
            <button class="action-btn" data-bookmark-id="${g.id}" title="Bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function renderGrammar() {
    const list = document.getElementById('grammar-list');
    const countTag = document.getElementById('grammar-count');
    const breakdownTag = document.getElementById('grammar-origin-breakdown');
    if (!list) return;

    const items = filterItems(window.JLPT_DATA.grammar, ['pattern', 'meaning', 'explanation', 'structure'], 'grammar');

    if (countTag) countTag.textContent = `${items.length} Grammar Points displayed`;

    if (breakdownTag && window.JLPT_DATA.getLevelStats) {
      const stats = window.JLPT_DATA.getLevelStats('grammar', state.selectedLevel);
      if (state.selectedLevel === 'ALL') {
        breakdownTag.textContent = `(${stats.total} total across all levels)`;
      } else {
        breakdownTag.innerHTML = `&bull; <strong>${stats.newCount}</strong> New in ${state.selectedLevel} &bull; <strong>${stats.reviewCount}</strong> Review`;
      }
    }

    renderCategoryWithProgressiveScroll('grammar', items, 'No grammar points found matching current filters.');
  }

  // --- 4. FLASHCARDS ENGINE ---
  function renderFlashcardSourceFilter() {
    const bookSelect = document.getElementById('fc-book-select');
    const chapterContainer = document.getElementById('fc-chapter-pills-container');
    if (!bookSelect || !chapterContainer) return;

    const cat = state.flashcards.category;
    const catName = cat === 'vocab' ? 'vocabulary' : cat;
    let books = [];

    if (cat === 'bookmarks') {
      const allBookmarks = [
        ...(window.JLPT_DATA.kanji || []),
        ...(window.JLPT_DATA.vocabulary || []),
        ...(window.JLPT_DATA.grammar || [])
      ].filter(item => state.bookmarks.has(item.id));
      const bMap = new Map();
      allBookmarks.forEach(item => {
        const dBooks = [...new Set((item.sources || []).map(s => s.book).filter(Boolean))];
        dBooks.forEach(b => bMap.set(b, (bMap.get(b) || 0) + 1));
      });
      books = Array.from(bMap.entries()).map(([book, count]) => ({ book, count })).sort((a, b) => b.count - a.count);
    } else {
      books = getAvailableBooks(catName, state.selectedLevel);
    }

    // Ensure selected book is valid
    if (state.flashcards.book !== 'ALL' && !books.some(b => b.book === state.flashcards.book)) {
      state.flashcards.book = 'ALL';
    }

    // Compute total items for "All Textbooks"
    let categoryTotal = 0;
    if (cat === 'vocab' && window.JLPT_DATA.getVocabStats) {
      const vStats = window.JLPT_DATA.getVocabStats(state.selectedLevel);
      categoryTotal = state.vocabTypeFilter === 'TEXTBOOK' ? vStats.textbookCount :
                      state.vocabTypeFilter === 'COMPOUNDS' ? vStats.compoundsCount : vStats.total;
    } else if (cat === 'bookmarks') {
      categoryTotal = state.bookmarks.size;
    } else if (window.JLPT_DATA && window.JLPT_DATA.getLevelStats) {
      const stats = window.JLPT_DATA.getLevelStats(catName, state.selectedLevel);
      categoryTotal = stats.total;
    }

    // Populate Textbook Dropdown
    let bookOptions = `<option value="ALL">All Textbooks (${categoryTotal})</option>`;
    books.forEach(b => {
      const isSelected = state.flashcards.book === b.book ? 'selected' : '';
      bookOptions += `<option value="${b.book}" ${isSelected}>${b.book} (${b.count})</option>`;
    });
    bookSelect.innerHTML = bookOptions;

    // Retrieve Available Chapters / Lessons
    let chapters = [];
    if (cat === 'bookmarks') {
      const allBookmarks = [
        ...(window.JLPT_DATA.kanji || []),
        ...(window.JLPT_DATA.vocabulary || []),
        ...(window.JLPT_DATA.grammar || [])
      ].filter(item => state.bookmarks.has(item.id));
      const chapMap = new Map();
      allBookmarks.forEach(item => {
        (item.sources || []).forEach(s => {
          if (state.flashcards.book !== 'ALL' && s.book !== state.flashcards.book) return;
          const rawChap = s.chapter || s.lesson;
          if (!rawChap) return;
          let groupKey = rawChap;
          const weekMatch = rawChap.match(/^(Week\s+\d+)/i);
          const lessonMatch = rawChap.match(/^(Lesson\s+\d+)/i);
          const chapterMatch = rawChap.match(/^(Chapter\s+\d+)/i);
          if (weekMatch) groupKey = weekMatch[1];
          else if (lessonMatch) groupKey = lessonMatch[1];
          else if (chapterMatch) groupKey = chapterMatch[1];
          chapMap.set(groupKey, (chapMap.get(groupKey) || 0) + 1);
        });
      });
      chapters = Array.from(chapMap.entries()).map(([id, count]) => ({ id, label: id, count })).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
    } else {
      chapters = getAvailableChapters(catName, state.selectedLevel, state.flashcards.book);
    }

    // Ensure selected chapter is valid
    if (state.flashcards.chapter !== 'ALL' && !chapters.some(c => c.id === state.flashcards.chapter)) {
      state.flashcards.chapter = 'ALL';
    }

    // Compute total count for selected book / all books
    let selectedBookTotal = categoryTotal;
    if (state.flashcards.book !== 'ALL') {
      const bObj = books.find(b => b.book === state.flashcards.book);
      if (bObj) selectedBookTotal = bObj.count;
    }

    // Populate Chapter / Lesson Pills
    let pillsHtml = `
      <button class="week-pill ${state.flashcards.chapter === 'ALL' ? 'active' : ''}" data-fc-chapter="ALL">
        All Lessons (${selectedBookTotal})
      </button>
    `;

    chapters.forEach(c => {
      const isAct = state.flashcards.chapter === c.id ? 'active' : '';
      pillsHtml += `
        <button class="week-pill ${isAct}" data-fc-chapter="${c.id}">
          ${c.label} (${c.count})
        </button>
      `;
    });

    chapterContainer.innerHTML = pillsHtml;

    // Attach event listeners for chapter pills
    chapterContainer.querySelectorAll('[data-fc-chapter]').forEach(pill => {
      pill.addEventListener('click', (e) => {
        chapterContainer.querySelectorAll('[data-fc-chapter]').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.flashcards.chapter = e.currentTarget.getAttribute('data-fc-chapter');
        buildFlashcardDeck();
        renderFlashcard();
      });
    });

    // Wire change handler on bookSelect
    bookSelect.onchange = function () {
      state.flashcards.book = this.value;
      state.flashcards.chapter = 'ALL';
      renderFlashcardSourceFilter();
      buildFlashcardDeck();
      renderFlashcard();
    };
  }

  function buildFlashcardDeck() {
    const cat = state.flashcards.category;
    let baseItems = [];

    if (cat === 'kanji') {
      baseItems = window.JLPT_DATA.kanji || [];
    } else if (cat === 'vocab') {
      baseItems = window.JLPT_DATA.vocabulary || [];
    } else if (cat === 'grammar') {
      baseItems = window.JLPT_DATA.grammar || [];
    } else if (cat === 'bookmarks') {
      baseItems = [
        ...(window.JLPT_DATA.kanji || []),
        ...(window.JLPT_DATA.vocabulary || []),
        ...(window.JLPT_DATA.grammar || [])
      ].filter(item => state.bookmarks.has(item.id));
    }

    // 1. Filter by JLPT Level & Scope
    let filtered = baseItems.filter(item => {
      if (cat !== 'bookmarks') {
        if (!matchLevel(item)) return false;
        if (!matchOrigin(item)) return false;
      }

      // Filter by selected Textbook
      let srcList = item.sources || [];
      if (cat === 'vocab') {
        if (state.vocabTypeFilter === 'TEXTBOOK' && item.textbookSources && item.textbookSources.length > 0) srcList = item.textbookSources;
        else if (state.vocabTypeFilter === 'COMPOUNDS' && item.compoundSources && item.compoundSources.length > 0) srcList = item.compoundSources;
      }

      if (state.flashcards.book !== 'ALL') {
        const hasBook = Array.isArray(srcList) && srcList.some(s => s.book === state.flashcards.book);
        if (!hasBook) return false;
      }

      // Filter by selected Chapter / Lesson
      if (state.flashcards.chapter !== 'ALL') {
        const hasChapter = Array.isArray(srcList) && srcList.some(s => {
          if (state.flashcards.book !== 'ALL' && s.book !== state.flashcards.book) return false;
          const rawChap = s.chapter || s.lesson;
          if (!rawChap) return false;
          let groupKey = rawChap;
          const weekMatch = rawChap.match(/^(Week\s+\d+)/i);
          const lessonMatch = rawChap.match(/^(Lesson\s+\d+)/i);
          const chapterMatch = rawChap.match(/^(Chapter\s+\d+)/i);
          if (weekMatch) groupKey = weekMatch[1];
          else if (lessonMatch) groupKey = lessonMatch[1];
          else if (chapterMatch) groupKey = chapterMatch[1];
          return groupKey === state.flashcards.chapter || rawChap === state.flashcards.chapter || rawChap.startsWith(state.flashcards.chapter);
        });
        if (!hasChapter) return false;
      }

      return true;
    });

    // Compute status counts
    const unmasteredCount = filtered.filter(item => !state.mastered.has(item.id)).length;
    const masteredCount = filtered.filter(item => state.mastered.has(item.id)).length;

    const unmasteredBadge = document.getElementById('fc-count-unmastered');
    const masteredBadge = document.getElementById('fc-count-mastered');
    const deckStatsBadge = document.getElementById('fc-deck-stats-badge');
    if (unmasteredBadge) unmasteredBadge.textContent = unmasteredCount;
    if (masteredBadge) masteredBadge.textContent = masteredCount;

    // Apply Status filter (All / Unmastered / Mastered)
    if (state.flashcards.status === 'UNMASTERED') {
      filtered = filtered.filter(item => !state.mastered.has(item.id));
    } else if (state.flashcards.status === 'MASTERED') {
      filtered = filtered.filter(item => state.mastered.has(item.id));
    }

    if (deckStatsBadge) deckStatsBadge.textContent = `${filtered.length} Cards in Deck`;

    state.flashcards.deck = filtered;
    if (state.flashcards.currentIndex >= filtered.length) {
      state.flashcards.currentIndex = Math.max(0, filtered.length - 1);
    }
    state.flashcards.isFlipped = false;
  }

  function renderFlashcard() {
    const cardEl = document.getElementById('flashcard-element');
    const indexDisplay = document.getElementById('fc-index-display');
    const totalDisplay = document.getElementById('fc-total-display');
    const progressFill = document.getElementById('fc-progress-fill');
    const jumpInput = document.getElementById('fc-jump-input');
    const masteryBtn = document.getElementById('fc-toggle-mastery-btn');
    const masteryIcon = document.getElementById('fc-mastery-icon');
    const masteryText = document.getElementById('fc-mastery-text');
    if (!cardEl) return;

    const deck = state.flashcards.deck;
    const total = deck.length;
    const idx = state.flashcards.currentIndex;

    if (indexDisplay) indexDisplay.textContent = total > 0 ? idx + 1 : 0;
    if (totalDisplay) totalDisplay.textContent = total;
    if (jumpInput) {
      jumpInput.max = total || 1;
      jumpInput.value = total > 0 ? idx + 1 : 1;
    }
    if (progressFill) {
      const pct = total > 0 ? ((idx + 1) / total) * 100 : 0;
      progressFill.style.width = `${pct}%`;
    }

    const frontEl = cardEl.querySelector('.fc-front');
    const backEl = cardEl.querySelector('.fc-back');
    if (!frontEl || !backEl) return;

    if (total === 0) {
      cardEl.classList.remove('flipped');
      frontEl.innerHTML = `
        <div class="fc-main-center">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">📭</div>
          <div class="fc-meaning-lead">No Cards Found in Deck</div>
          <p class="text-muted" style="font-size: 0.88rem; max-width: 320px; margin: 0 auto 16px;">Try selecting "All Cards" or choosing another level / textbook filter above.</p>
          <button class="btn-primary-sm" onclick="window.NihonHub.resetFlashcardFilters()">Reset Deck Filters</button>
        </div>
      `;
      backEl.innerHTML = frontEl.innerHTML;
      if (masteryBtn) masteryBtn.style.display = 'none';
      return;
    }

    if (masteryBtn) masteryBtn.style.display = 'inline-flex';

    const item = deck[idx];
    const isMastered = state.mastered.has(item.id);
    const isBookmarked = state.bookmarks.has(item.id);
    const sNo = idx + 1;

    // Update bottom mastery button
    if (masteryBtn) {
      masteryBtn.classList.toggle('is-mastered', isMastered);
      if (masteryIcon) masteryIcon.textContent = isMastered ? '✓' : '○';
      if (masteryText) masteryText.textContent = isMastered ? 'Mastered' : 'Mark Mastered';
    }

    cardEl.classList.toggle('flipped', state.flashcards.isFlipped);

    // Identify item type
    const isKanji = !!item.char;
    const isVocab = !!item.word;

    const sourceInfo = item.sources && item.sources[0] ? item.sources[0] : null;
    const chapterTag = sourceInfo ? (sourceInfo.chapter || sourceInfo.lesson || sourceInfo.book || '') : '';

    if (isKanji) {
      // Kanji Card Face
      frontEl.innerHTML = `
        <div class="fc-face-header">
          <div class="fc-face-badges">
            <span class="sno-badge">#${sNo}</span>
            ${renderLevelPills(item.levels)}
            ${renderOriginBadge(item)}
            ${chapterTag ? `<span class="source-pill">${chapterTag}</span>` : ''}
          </div>
          <div class="fc-face-actions" onclick="event.stopPropagation()">
            <button class="action-btn" data-speak="${item.char}" title="Listen (A)">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${item.id}" title="Bookmark (B)">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="fc-main-center">
          <div class="fc-big-text">${item.char}</div>
          <div class="fc-prompt-hint">Tap card or press <kbd>Space</kbd> to reveal readings & meaning ↺</div>
        </div>

        <div class="fc-face-footer">
          <span class="text-muted" style="font-size: 0.78rem;">${item.examples ? item.examples.length : 0} Compound Examples</span>
          <span class="fc-prompt-hint">Flip ↺</span>
        </div>
      `;

      backEl.innerHTML = `
        <div class="fc-face-header">
          <div class="fc-face-badges">
            <span class="sno-badge">#${sNo}</span>
            ${renderLevelPills(item.levels)}
          </div>
          <div class="fc-face-actions" onclick="event.stopPropagation()">
            <button class="action-btn" data-speak="${item.char}" title="Listen (A)">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${item.id}" title="Bookmark (B)">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="fc-main-center">
          <div class="fc-meaning-lead">${item.meaning}</div>
          <div class="fc-readings-box">
            ${item.onyomi ? `<div><span class="r-label">ON:</span> <span class="r-val">${item.onyomi}</span></div>` : ''}
            ${item.kunyomi ? `<div><span class="r-label">KUN:</span> <span class="r-val">${item.kunyomi}</span></div>` : ''}
          </div>
          ${item.examples && item.examples.length > 0 ? `
            <div class="fc-examples-box">
              <div class="fc-ex-row">
                <span class="fc-ex-ja"><strong>${item.examples[0].word}</strong> 【${item.examples[0].reading}】</span>
                <button class="mini-audio-btn" data-speak="${item.examples[0].word}" onclick="event.stopPropagation()" title="Listen">${UI_ICONS.volume}</button>
              </div>
              <div class="fc-ex-en">${item.examples[0].meaning}</div>
            </div>
          ` : ''}
        </div>

        <div class="fc-face-footer" onclick="event.stopPropagation()">
          <div class="fc-quick-response-btns">
            <button class="fc-resp-btn needs-review" onclick="window.NihonHub.flashcardResponse(false)">
              🔄 Needs Practice
            </button>
            <button class="fc-resp-btn got-it" onclick="window.NihonHub.flashcardResponse(true)">
              ✅ Mastered (Got It!)
            </button>
          </div>
        </div>
      `;

    } else if (isVocab) {
      // Vocabulary Card Face
      const components = item.kanjiComponents || [];
      frontEl.innerHTML = `
        <div class="fc-face-header">
          <div class="fc-face-badges">
            <span class="sno-badge">#${sNo}</span>
            ${renderLevelPills(item.levels || [item.level])}
            ${renderOriginBadge(item)}
            ${item.isTextbookVocab ? '<span class="source-pill badge-textbook">📚 Textbook</span>' : ''}
            ${item.isKanjiCompound ? '<span class="source-pill badge-compound">🈁 Compound</span>' : ''}
          </div>
          <div class="fc-face-actions" onclick="event.stopPropagation()">
            <button class="action-btn" data-speak="${item.word}" title="Listen (A)">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${item.id}" title="Bookmark (B)">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="fc-main-center">
          <div class="fc-big-word">${renderVocabWordByMode(item)}</div>
          ${state.vocabScriptMode !== 'hiragana' && item.reading ? `<div class="fc-reading-sub">【${item.reading}】</div>` : ''}
          <div class="fc-prompt-hint" style="margin-top: 12px;">Tap card or press <kbd>Space</kbd> to reveal meaning ↺</div>
        </div>

        <div class="fc-face-footer">
          <span class="text-muted" style="font-size: 0.78rem;">${chapterTag}</span>
          <span class="fc-prompt-hint">Flip ↺</span>
        </div>
      `;

      backEl.innerHTML = `
        <div class="fc-face-header">
          <div class="fc-face-badges">
            <span class="sno-badge">#${sNo}</span>
            ${renderLevelPills(item.levels || [item.level])}
          </div>
          <div class="fc-face-actions" onclick="event.stopPropagation()">
            <button class="action-btn" data-speak="${item.word}" title="Listen (A)">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${item.id}" title="Bookmark (B)">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="fc-main-center">
          <div class="fc-reading-sub" style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">
            ${item.word} 【${item.reading}】
          </div>
          ${item.romaji ? `<div class="text-muted" style="font-size: 0.85rem; margin-bottom: 6px;">${item.romaji}</div>` : ''}
          <div class="fc-meaning-lead">${item.meaning}</div>

          ${components.length > 0 ? `
            <div class="t-mini-blocks" style="justify-content: center; margin-bottom: 10px;" onclick="event.stopPropagation()">
              ${components.map(comp => `
                <span class="t-mini-block" onclick="window.NihonHub.openKanjiModalByChar('${comp.char}')" title="${comp.char}: ${comp.meaning}">
                  ${comp.char} (${comp.meaning})
                </span>
              `).join('')}
            </div>
          ` : ''}

          ${item.example ? `
            <div class="fc-examples-box">
              <div class="fc-ex-row">
                <span class="fc-ex-ja">${parseFurigana(item.example.furigana || item.example.ja)}</span>
                <button class="mini-audio-btn" data-speak="${item.example.ja}" onclick="event.stopPropagation()" title="Listen">${UI_ICONS.volume}</button>
              </div>
              <div class="fc-ex-en">${item.example.en || ''}</div>
            </div>
          ` : ''}
        </div>

        <div class="fc-face-footer" onclick="event.stopPropagation()">
          <div class="fc-quick-response-btns">
            <button class="fc-resp-btn needs-review" onclick="window.NihonHub.flashcardResponse(false)">
              🔄 Needs Practice
            </button>
            <button class="fc-resp-btn got-it" onclick="window.NihonHub.flashcardResponse(true)">
              ✅ Mastered (Got It!)
            </button>
          </div>
        </div>
      `;

    } else {
      // Grammar Card Face
      frontEl.innerHTML = `
        <div class="fc-face-header">
          <div class="fc-face-badges">
            <span class="sno-badge">#${sNo}</span>
            ${renderLevelPills(item.levels || [item.level])}
            ${renderOriginBadge(item)}
            ${chapterTag ? `<span class="source-pill">${chapterTag}</span>` : ''}
          </div>
          <div class="fc-face-actions" onclick="event.stopPropagation()">
            <button class="action-btn" data-speak="${item.pattern}" title="Listen (A)">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${item.id}" title="Bookmark (B)">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="fc-main-center">
          <div class="fc-big-pattern">${item.pattern}</div>
          <div class="fc-prompt-hint">Tap card or press <kbd>Space</kbd> to reveal structure & explanation ↺</div>
        </div>

        <div class="fc-face-footer">
          <span class="text-muted" style="font-size: 0.78rem;">Grammar Rule</span>
          <span class="fc-prompt-hint">Flip ↺</span>
        </div>
      `;

      backEl.innerHTML = `
        <div class="fc-face-header">
          <div class="fc-face-badges">
            <span class="sno-badge">#${sNo}</span>
            ${renderLevelPills(item.levels || [item.level])}
          </div>
          <div class="fc-face-actions" onclick="event.stopPropagation()">
            <button class="action-btn" data-speak="${item.pattern}" title="Listen (A)">${UI_ICONS.volume}</button>
            <button class="action-btn" data-bookmark-id="${item.id}" title="Bookmark (B)">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
          </div>
        </div>

        <div class="fc-main-center">
          <div class="fc-meaning-lead">${item.meaning}</div>
          ${item.structure ? `<div style="margin-bottom: 8px;"><code class="t-structure-code">${item.structure}</code></div>` : ''}
          ${item.explanation ? `<div class="t-grammar-expl" style="margin-bottom: 10px; max-width: 580px;">${item.explanation}</div>` : ''}
          
          ${Array.isArray(item.examples) && item.examples.length > 0 ? `
            <div class="fc-examples-box">
              <div class="fc-ex-row">
                <span class="fc-ex-ja">${parseFurigana(item.examples[0].furigana || item.examples[0].ja)}</span>
                <button class="mini-audio-btn" data-speak="${item.examples[0].ja}" onclick="event.stopPropagation()" title="Listen">${UI_ICONS.volume}</button>
              </div>
              <div class="fc-ex-en">${item.examples[0].en}</div>
            </div>
          ` : ''}
        </div>

        <div class="fc-face-footer" onclick="event.stopPropagation()">
          <div class="fc-quick-response-btns">
            <button class="fc-resp-btn needs-review" onclick="window.NihonHub.flashcardResponse(false)">
              🔄 Needs Practice
            </button>
            <button class="fc-resp-btn got-it" onclick="window.NihonHub.flashcardResponse(true)">
              ✅ Mastered (Got It!)
            </button>
          </div>
        </div>
      `;
    }
  }

  function flipFlashcard() {
    state.flashcards.isFlipped = !state.flashcards.isFlipped;
    const cardEl = document.getElementById('flashcard-element');
    if (cardEl) cardEl.classList.toggle('flipped', state.flashcards.isFlipped);
  }

  function nextFlashcard() {
    if (state.flashcards.deck.length === 0) return;
    state.flashcards.currentIndex = (state.flashcards.currentIndex + 1) % state.flashcards.deck.length;
    state.flashcards.isFlipped = false;
    renderFlashcard();
  }

  function prevFlashcard() {
    if (state.flashcards.deck.length === 0) return;
    state.flashcards.currentIndex = (state.flashcards.currentIndex - 1 + state.flashcards.deck.length) % state.flashcards.deck.length;
    state.flashcards.isFlipped = false;
    renderFlashcard();
  }

  function shuffleFlashcards() {
    for (let i = state.flashcards.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.flashcards.deck[i], state.flashcards.deck[j]] = [state.flashcards.deck[j], state.flashcards.deck[i]];
    }
    state.flashcards.currentIndex = 0;
    state.flashcards.isFlipped = false;
    renderFlashcard();
  }

  function flashcardResponse(isMastered) {
    const deck = state.flashcards.deck;
    const idx = state.flashcards.currentIndex;
    if (deck.length === 0 || idx >= deck.length) return;
    const item = deck[idx];
    if (isMastered) {
      state.mastered.add(item.id);
    } else {
      state.mastered.delete(item.id);
    }
    savePreferences();
    updateFooterStats();
    
    // Auto advance to next card
    state.flashcards.isFlipped = false;
    if (state.flashcards.status !== 'ALL') {
      buildFlashcardDeck();
    } else {
      state.flashcards.currentIndex = (state.flashcards.currentIndex + 1) % state.flashcards.deck.length;
    }
    renderFlashcard();
  }

  function toggleMasteryCurrentFlashcard() {
    const deck = state.flashcards.deck;
    const idx = state.flashcards.currentIndex;
    if (deck.length === 0 || idx >= deck.length) return;
    const item = deck[idx];
    toggleMastery(item.id);
    renderFlashcard();
  }

  function toggleBookmarkCurrentFlashcard() {
    const deck = state.flashcards.deck;
    const idx = state.flashcards.currentIndex;
    if (deck.length === 0 || idx >= deck.length) return;
    const item = deck[idx];
    toggleBookmark(item.id);
    renderFlashcard();
  }

  function speakCurrentFlashcard() {
    const deck = state.flashcards.deck;
    const idx = state.flashcards.currentIndex;
    if (deck.length === 0 || idx >= deck.length) return;
    const item = deck[idx];
    const textToSpeak = item.char || item.word || item.pattern;
    if (textToSpeak) speakJapanese(textToSpeak);
  }

  function jumpToFlashcard(targetIdx) {
    const total = state.flashcards.deck.length;
    if (total === 0) return;
    const validIdx = Math.max(0, Math.min(targetIdx, total - 1));
    state.flashcards.currentIndex = validIdx;
    state.flashcards.isFlipped = false;
    renderFlashcard();
  }

  function resetFlashcardFilters() {
    state.flashcards.book = 'ALL';
    state.flashcards.chapter = 'ALL';
    state.flashcards.status = 'ALL';
    document.querySelectorAll('.fc-status-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-fc-status') === 'ALL'));
    renderFlashcardSourceFilter();
    buildFlashcardDeck();
    renderFlashcard();
  }

  // --- 5. KANA CHARTS RENDERER ---
  function renderKana() {
    const hGrid = document.getElementById('hiragana-grid');
    const kGrid = document.getElementById('katakana-grid');
    if (!hGrid || !kGrid || !window.JLPT_DATA.kana) return;

    hGrid.innerHTML = (window.JLPT_DATA.kana.hiragana || []).map(k => `
      <div class="kana-card card-glass ${!k.char ? 'empty' : ''}" ${k.char ? `data-speak="${k.char}"` : ''}>
        ${k.char ? `<div class="kana-char">${k.char}</div><div class="kana-romaji">${k.romaji}</div>` : ''}
      </div>
    `).join('');

    kGrid.innerHTML = (window.JLPT_DATA.kana.katakana || []).map(k => `
      <div class="kana-card card-glass ${!k.char ? 'empty' : ''}" ${k.char ? `data-speak="${k.char}"` : ''}>
        ${k.char ? `<div class="kana-char">${k.char}</div><div class="kana-romaji">${k.romaji}</div>` : ''}
      </div>
    `).join('');
  }

  // --- 6. BOOKMARKS RENDERER ---
  function renderBookmarkCardHtml(item, sNo) {
    const isKanji = !!item.char;
    const isVocab = !!item.word;

    return `
      <div class="bookmark-card card-glass">
        <div class="bm-header">
          <div style="display: flex; align-items: center; gap: 6px;">
            ${sNo ? `<span class="sno-badge" title="Card #${sNo}">#${sNo}</span>` : ''}
            <div class="bm-type-badge">${isKanji ? 'Kanji' : isVocab ? 'Vocab' : 'Grammar'}</div>
          </div>
          <button class="action-btn" data-bookmark-id="${item.id}" title="Remove Bookmark">
            ${UI_ICONS.starFilled}
          </button>
        </div>
        <div class="bm-body">
          <div class="bm-title">${item.char || item.word || item.pattern}</div>
          <div class="bm-sub">${item.reading || item.onyomi || item.meaning}</div>
          <div class="bm-meaning">${item.meaning || item.explanation || ''}</div>
        </div>
        <div class="bm-footer">
          <button class="btn-primary-sm" data-speak="${item.char || item.word || item.pattern}">
            ${UI_ICONS.volume} Listen
          </button>
          ${isKanji ? `<button class="btn-secondary-sm" onclick="window.NihonHub.openKanjiModal('${item.id}')">View Kanji</button>` : ''}
        </div>
      </div>
    `;
  }

  function renderBookmarkTableRowHtml(item, sNo) {
    const isKanji = !!item.char;
    const isVocab = !!item.word;

    return `
      <tr class="study-table-row">
        <td class="col-sno"><span class="sno-badge">#${sNo}</span></td>
        <td class="col-bm-type">
          <span class="bm-type-badge">${isKanji ? 'Kanji' : isVocab ? 'Vocab' : 'Grammar'}</span>
        </td>
        <td class="col-bm-main">
          <div class="t-bm-item">
            <span class="t-bm-title">${item.char || item.word || item.pattern}</span>
            <button class="mini-audio-btn" data-speak="${item.char || item.word || item.pattern}" title="Listen">${UI_ICONS.volume}</button>
            ${(item.reading || item.onyomi) ? `<span class="t-reading">【${item.reading || item.onyomi}】</span>` : ''}
          </div>
        </td>
        <td class="col-meaning">
          <div class="t-meaning">${item.meaning || item.explanation || ''}</div>
        </td>
        <td class="col-actions">
          <div class="t-actions-wrap">
            <button class="action-btn" data-bookmark-id="${item.id}" title="Remove Bookmark">
              ${UI_ICONS.starFilled}
            </button>
            ${isKanji ? `<span class="t-details-btn" onclick="window.NihonHub.openKanjiModal('${item.id}')">View &rarr;</span>` : ''}
          </div>
        </td>
      </tr>
    `;
  }

  function toggleBookmark(id) {
    if (state.bookmarks.has(id)) {
      state.bookmarks.delete(id);
    } else {
      state.bookmarks.add(id);
    }
    savePreferences();
    renderBookmarks();
    if (state.currentTab === 'kanji') renderKanji();
    else if (state.currentTab === 'vocab') renderVocabulary();
    else if (state.currentTab === 'grammar') renderGrammar();
  }

  function renderBookmarks() {
    const list = document.getElementById('bookmarks-list');
    const countTag = document.getElementById('bookmark-count');
    if (!list) return;

    const allItems = [
      ...(window.JLPT_DATA.kanji || []),
      ...(window.JLPT_DATA.vocabulary || []),
      ...(window.JLPT_DATA.grammar || [])
    ];

    const saved = allItems.filter(item => state.bookmarks.has(item.id));

    if (countTag) countTag.textContent = `${saved.length} Items Saved`;

    renderCategoryWithProgressiveScroll('bookmarks', saved, 'No bookmarked items yet. Click the star icon on any Kanji, word, or grammar rule to save it here!');
  }

  // --- EXPOSE API GLOBALLY ---
  window.NihonHub = {
    selectLevel: (lvl) => {
      state.selectedLevel = lvl;
      document.querySelectorAll('.level-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-level') === lvl);
      });
      const activeLevelText = document.getElementById('active-level-indicator-badge');
      if (activeLevelText) activeLevelText.textContent = state.selectedLevel;

      state.filters.kanji.chapter = 'ALL';
      state.filters.vocabulary.chapter = 'ALL';
      state.filters.grammar.chapter = 'ALL';
      buildFlashcardDeck();
      renderAll();
    },
    resetFilters: () => {
      state.selectedLevel = 'ALL';
      state.originFilter = 'ALL';
      state.searchQuery = '';
      state.vocabTypeFilter = 'ALL';
      state.filters.kanji = { book: 'ALL', chapter: 'ALL' };
      state.filters.vocabulary = { book: 'ALL', chapter: 'ALL' };
      state.filters.grammar = { book: 'ALL', chapter: 'ALL' };
      const s = document.getElementById('global-search-input');
      if (s) s.value = '';
      const activeLevelText = document.getElementById('active-level-indicator-badge');
      if (activeLevelText) activeLevelText.textContent = 'ALL';
      document.querySelectorAll('.level-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-level') === 'ALL'));
      document.querySelectorAll('.origin-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-origin') === 'ALL'));
      document.querySelectorAll('.vtype-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-vocab-type') === 'ALL'));
      renderAll();
    },
    showCompoundsForKanji: (char) => {
      closeModal();
      switchTab('vocab');
      state.searchQuery = char;
      const s = document.getElementById('global-search-input');
      if (s) {
        s.value = char;
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.classList.remove('hidden');
      }
      renderVocabulary();
    },
    switchTab: switchTab,
    setViewMode: (category, mode) => {
      if (state.viewModes[category]) {
        state.viewModes[category] = mode;
        updateViewModeButtons(category);
        savePreferences();
        if (category === 'kanji') renderKanji();
        else if (category === 'vocabulary') renderVocabulary();
        else if (category === 'grammar') renderGrammar();
        else if (category === 'bookmarks') renderBookmarks();
      }
    },
    openKanjiModal: openKanjiModal,
    openKanjiModalByChar: openKanjiModalByChar,
    speakJapanese: speakJapanese,
    toggleBookmark: toggleBookmark,
    toggleMastery: toggleMastery,
    flashcardResponse: flashcardResponse,
    resetFlashcardFilters: resetFlashcardFilters,
    jumpToFlashcard: jumpToFlashcard,
    flipFlashcard: flipFlashcard,
    nextFlashcard: nextFlashcard,
    prevFlashcard: prevFlashcard,
    shuffleFlashcards: shuffleFlashcards
  };

})();

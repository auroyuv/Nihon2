/**
 * NihonHub - Interactive Application Engine
 * Clean, User-Friendly JLPT N5 to N2 Learning Platform
 * Fully dynamic: Real-time calculation of all counts, dynamic textbook & chapter extractions,
 * cross-level origin tracking (New vs Review), vocabulary, grammar, kana charts, flashcards, and bookmarks.
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
    sparkles: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    repeat: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`
  };

  // --- APPLICATION STATE ---
  const state = {
    currentTab: 'kanji',
    selectedLevel: 'ALL',
    originFilter: 'ALL', // 'ALL', 'NEW', 'REVIEW'
    searchQuery: '',
    showFurigana: true,
    showRomaji: true,
    theme: 'dark',
    bookmarks: new Set(),

    // Dynamic textbook & chapter filters per category
    filters: {
      kanji: { book: 'ALL', chapter: 'ALL' },
      vocabulary: { book: 'ALL', chapter: 'ALL' },
      grammar: { book: 'ALL', chapter: 'ALL' }
    },

    // Flashcard state
    flashcards: {
      deck: [],
      currentIndex: 0,
      isFlipped: false,
      category: 'kanji'
    }
  };

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    initTheme();
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

      const savedBookmarks = localStorage.getItem('nihon_bookmarks');
      if (savedBookmarks) state.bookmarks = new Set(JSON.parse(savedBookmarks));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem('nihon_theme', state.theme);
      localStorage.setItem('nihon_furigana', state.showFurigana);
      localStorage.setItem('nihon_romaji', state.showRomaji);
      localStorage.setItem('nihon_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
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

  // --- NATIVE SPEECH SYNTHESIS ---
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
    utterance.rate = 0.88;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP'));
    if (jaVoice) utterance.voice = jaVoice;

    window.speechSynthesis.speak(utterance);
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

  // --- DYNAMIC SOURCE / BOOK / CHAPTER QUERY HELPERS ---
  function getAvailableBooks(category, level) {
    const masterList = (window.JLPT_DATA && window.JLPT_DATA[category]) ? window.JLPT_DATA[category] : [];
    const levelItems = masterList.filter(item => level === 'ALL' || (item.levels && item.levels.includes(level)));
    const bookMap = new Map();

    levelItems.forEach(item => {
      (item.sources || []).forEach(s => {
        if (s.book) {
          bookMap.set(s.book, (bookMap.get(s.book) || 0) + 1);
        }
      });
    });

    return Array.from(bookMap.entries())
      .map(([book, count]) => ({ book, count }))
      .sort((a, b) => b.count - a.count);
  }

  function getAvailableChapters(category, level, selectedBook) {
    const masterList = (window.JLPT_DATA && window.JLPT_DATA[category]) ? window.JLPT_DATA[category] : [];
    const levelItems = masterList.filter(item => level === 'ALL' || (item.levels && item.levels.includes(level)));
    const chapterMap = new Map();

    levelItems.forEach(item => {
      (item.sources || []).forEach(s => {
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
          let label = groupKey;
          chapterMap.set(groupKey, {
            id: groupKey,
            label: label,
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
    const stats = window.JLPT_DATA ? window.JLPT_DATA.getLevelStats(category, state.selectedLevel) : { total: 0 };

    // Validate selected book
    if (currentFilter.book !== 'ALL' && !availableBooks.some(b => b.book === currentFilter.book)) {
      currentFilter.book = 'ALL';
    }

    // Populate Book Select Dropdown
    let selectOptions = `<option value="ALL">All Textbooks (${stats.total})</option>`;
    availableBooks.forEach(b => {
      const isSelected = currentFilter.book === b.book ? 'selected' : '';
      selectOptions += `<option value="${b.book}" ${isSelected}>${b.book} (${b.count})</option>`;
    });
    selectEl.innerHTML = selectOptions;

    // Update Title if Kanji
    if (titleEl) {
      if (currentFilter.book !== 'ALL') {
        titleEl.textContent = `${currentFilter.book} Chapter Filter`;
      } else if (state.selectedLevel !== 'ALL') {
        titleEl.textContent = `JLPT ${state.selectedLevel} Kanji Curriculum`;
      } else {
        titleEl.textContent = `All Levels Kanji Curriculum`;
      }
    }

    // Populate Chapter Pills
    const availableChapters = getAvailableChapters(category, state.selectedLevel, currentFilter.book);
    if (currentFilter.chapter !== 'ALL' && !availableChapters.some(c => c.id === currentFilter.chapter)) {
      currentFilter.chapter = 'ALL';
    }

    let selectedBookTotal = stats.total;
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

    // Attach Event Listeners
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

  // --- DYNAMIC LEVEL PROGRESSION & OVERLAP BANNER ---
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

    // Update filter pill chip numbers
    const pillAll = document.getElementById('scope-count-all');
    const pillNew = document.getElementById('scope-count-new');
    const pillReview = document.getElementById('scope-count-review');

    if (pillAll) pillAll.textContent = stats.total;
    if (pillNew) pillNew.textContent = stats.newCount;
    if (pillReview) pillReview.textContent = stats.reviewCount;

    // Calculate percentage of New vs Review
    const newPct = stats.total > 0 ? Math.round((stats.newCount / stats.total) * 100) : 100;
    const reviewPct = stats.total > 0 ? 100 - newPct : 0;

    if (state.selectedLevel === 'ALL') {
      const n5Count = masterList.filter(i => i.firstLevel === 'N5').length;
      const n4Count = masterList.filter(i => i.firstLevel === 'N4').length;
      const n3Count = masterList.filter(i => i.firstLevel === 'N3').length;
      const n2Count = masterList.filter(i => i.firstLevel === 'N2').length;

      banner.innerHTML = `
        <div class="progression-banner-inner">
          <div class="prog-stat-box">
            <span class="prog-label">Total Unique ${catTitle} (N5 to N2):</span>
            <span class="prog-huge-val">${totalMasterCount}</span>
          </div>
          <div class="prog-levels-breakdown">
            <div class="prog-level-chip badge-n5"><strong>N5 Origin:</strong> ${n5Count}</div>
            <div class="prog-level-chip badge-n4"><strong>N4 Origin:</strong> ${n4Count}</div>
            <div class="prog-level-chip badge-n3"><strong>N3 Origin:</strong> ${n3Count}</div>
            <div class="prog-level-chip badge-n2"><strong>N2 Origin:</strong> ${n2Count}</div>
          </div>
          <div class="prog-desc">
            Cumulative view showing all unique ${catTitle.toLowerCase()} across all 4 JLPT levels combined.
          </div>
        </div>
      `;
    } else {
      banner.innerHTML = `
        <div class="progression-banner-inner">
          <div class="prog-stat-box">
            <span class="prog-label">JLPT ${state.selectedLevel} ${catTitle} Syllabus:</span>
            <span class="prog-huge-val">${stats.total} <small>Total</small></span>
          </div>
          <div class="prog-split-row">
            <div class="prog-split-card new-card">
              <div class="split-top">
                <span class="split-icon">✨</span>
                <span class="split-title">Brand New in ${state.selectedLevel}:</span>
              </div>
              <div class="split-val"><strong>${stats.newCount}</strong> ${catTitle} (${newPct}%)</div>
              <div class="split-hint">Introduced for the first time in JLPT ${state.selectedLevel}</div>
            </div>
            
            <div class="prog-split-card review-card">
              <div class="split-top">
                <span class="split-icon">🔄</span>
                <span class="split-title">Repeated from Lower Levels:</span>
              </div>
              <div class="split-val"><strong>${stats.reviewCount}</strong> ${catTitle} (${reviewPct}%)</div>
              <div class="split-hint">Learned in earlier levels, reappearing in ${state.selectedLevel} with advanced compound words</div>
            </div>
          </div>
          <div class="prog-split-bar">
            <div class="split-fill-new" style="width: ${newPct}%;" title="${stats.newCount} New (${newPct}%)"></div>
            <div class="split-fill-review" style="width: ${reviewPct}%;" title="${stats.reviewCount} Review (${reviewPct}%)"></div>
          </div>
        </div>
      `;
    }
  }

  // --- DYNAMIC FOOTER STATS ---
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
      if (!matchLevel(item)) return false;
      if (!matchOrigin(item)) return false;

      // Filter by selected Book
      if (catFilter.book !== 'ALL') {
        const hasBook = Array.isArray(item.sources) && item.sources.some(s => s.book === catFilter.book);
        if (!hasBook) return false;
      }

      // Filter by selected Chapter / Week
      if (catFilter.chapter !== 'ALL') {
        const hasChapter = Array.isArray(item.sources) && item.sources.some(s => {
          if (catFilter.book !== 'ALL' && s.book !== catFilter.book) return false;
          const rawChap = s.chapter || s.lesson;
          return rawChap && (rawChap === catFilter.chapter || rawChap.startsWith(catFilter.chapter));
        });
        if (!hasChapter) return false;
      }

      if (!q) return true;
      
      // Search in specified fields
      const matchedField = searchFields.some(field => {
        const val = item[field];
        if (typeof val === 'string') return val.toLowerCase().includes(q);
        if (typeof val === 'number') return String(val) === q;
        if (Array.isArray(val)) {
          return val.some(v => typeof v === 'string' ? v.toLowerCase().includes(q) : JSON.stringify(v).toLowerCase().includes(q));
        }
        return false;
      });

      // Search in sources
      const matchedSource = Array.isArray(item.sources) && item.sources.some(s => 
        (s.book && s.book.toLowerCase().includes(q)) || 
        (s.chapter && s.chapter.toLowerCase().includes(q)) ||
        (s.notes && s.notes.toLowerCase().includes(q))
      );

      // Search in examples
      const matchedExamples = Array.isArray(item.examples) && item.examples.some(ex =>
        (ex.word && ex.word.toLowerCase().includes(q)) ||
        (ex.reading && ex.reading.toLowerCase().includes(q)) ||
        (ex.meaning && ex.meaning.toLowerCase().includes(q))
      );

      return matchedField || matchedSource || matchedExamples;
    });
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

    // Level selector pills
    document.querySelectorAll('.level-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.level-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.selectedLevel = e.currentTarget.getAttribute('data-level');
        
        // Reset category chapter filters to ALL on level switch
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
        buildFlashcardDeck();
        renderFlashcard();
      });
    });

    // Flashcard buttons
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
        if (e.code === 'Space') {
          e.preventDefault();
          flipFlashcard();
        } else if (e.key === 'ArrowRight' || e.key === 'j') {
          nextFlashcard();
        } else if (e.key === 'ArrowLeft' || e.key === 'k') {
          prevFlashcard();
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

      const kanjiCard = e.target.closest('[data-kanji-modal-id]');
      if (kanjiCard) {
        const kanjiId = kanjiCard.getAttribute('data-kanji-modal-id');
        openKanjiModal(kanjiId);
        return;
      }
    });
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
    renderSourceFilter('kanji');
    renderKanji();
    renderSourceFilter('vocabulary');
    renderVocabulary();
    renderSourceFilter('grammar');
    renderGrammar();
    renderKana();
    renderBookmarks();
    renderFlashcard();
  }

  function renderActiveTab() {
    updateLevelProgressionBanner();
    updateFooterStats();
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
      case 'flashcards': renderFlashcard(); break;
      case 'kana': renderKana(); break;
      case 'bookmarks': renderBookmarks(); break;
    }
  }

  // --- 1. KANJI MATRIX RENDERER ---
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

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state card-glass" style="grid-column: 1 / -1;">
          <p>No Kanji found matching the current Level (${state.selectedLevel}), Textbook, and Scope filters.</p>
          <button class="btn-primary" onclick="window.NihonHub.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(k => {
      const isBookmarked = state.bookmarks.has(k.id);
      const sourceInfo = k.sources && k.sources[0] ? k.sources[0] : null;
      const chapterBadge = sourceInfo ? (sourceInfo.chapter || sourceInfo.lesson || '') : '';
      const notes = sourceInfo && sourceInfo.notes ? sourceInfo.notes : '';

      return `
        <div class="kanji-card card-glass" data-kanji-modal-id="${k.id}">
          <div class="kanji-card-top">
            <div class="kanji-badges">
              ${renderLevelPills(k.levels)}
              ${renderOriginBadge(k)}
            </div>
            <div class="kanji-actions">
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
            <span class="example-count">${k.examples ? k.examples.length : 0} vocabulary words</span>
            <span class="open-detail-link">View details &rarr;</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- KANJI DETAIL MODAL ---
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

    list.innerHTML = filtered.map(ex => {
      const exLevels = ex.levels || [ex.level || 'N2'];
      const firstLvl = ex.firstLevel || exLevels[0] || 'N2';
      const isMultiLevel = exLevels.length > 1;
      const isNewInCurrent = selectedLevel !== 'ALL' && firstLvl === selectedLevel && !isMultiLevel;
      const isPriorReview = selectedLevel !== 'ALL' && firstLvl !== selectedLevel;
      const sourcesList = ex.sources || (ex.source ? [ex.source] : []);

      return `
        <div class="modal-example-row">
          <div class="example-jp-col">
            <div class="example-main-text">
              <span class="example-word">${ex.word}</span>
              <span class="example-reading">【${ex.reading}】</span>
              <button class="mini-audio-btn" data-speak="${ex.word}" title="Listen">${UI_ICONS.volume}</button>
            </div>
            
            <div class="ex-meta-badges">
              ${exLevels.map(lvl => `<span class="level-badge badge-${lvl.toLowerCase()}">${lvl}</span>`).join(' ')}
              ${sourcesList.map(s => `<span class="ex-source-chip" title="Textbook Source">${UI_ICONS.book} ${s}</span>`).join(' ')}
              ${isMultiLevel ? `<span class="ex-novelty-chip review">🔄 In ${exLevels.join(' & ')}</span>` : ''}
              ${isNewInCurrent ? `<span class="ex-novelty-chip new">✨ New in ${firstLvl}</span>` : ''}
              ${isPriorReview && !isMultiLevel ? `<span class="ex-novelty-chip review">🔄 Studied in ${firstLvl}</span>` : ''}
            </div>
          </div>
          <div class="example-en-col">${ex.meaning}</div>
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
    const examples = kanji.examples || [];

    // Calculate level breakdown of compound words
    const levelCounts = {};
    examples.forEach(ex => {
      const lvls = ex.levels || [ex.level || 'N2'];
      lvls.forEach(l => {
        levelCounts[l] = (levelCounts[l] || 0) + 1;
      });
    });

    const distinctLevels = Object.keys(levelCounts).sort();
    const breakdownText = distinctLevels.map(lvl => `${lvl}: ${levelCounts[lvl]}`).join(' • ');

    modalCompoundFilter = 'ALL';

    modalBody.innerHTML = `
      <div class="modal-kanji-header">
        <div class="modal-kanji-big">${kanji.char}</div>
        <div class="modal-kanji-info">
          <div class="modal-badges-row">
            ${renderLevelPills(kanji.levels)}
            ${renderOriginBadge(kanji)}
          </div>
          <h2 class="modal-meaning-title">${kanji.meaning}</h2>
          <div class="modal-details-grid">
            <div class="modal-detail-item">
              <span class="detail-label">Strokes:</span>
              <span class="detail-val">${kanji.strokes || '—'}</span>
            </div>
            <div class="modal-detail-item">
              <span class="detail-label">Radical:</span>
              <span class="detail-val">${kanji.radical || '—'}</span>
            </div>
            ${kanji.sources && kanji.sources.length > 0 ? `
              <div class="modal-sources-list">
                ${kanji.sources.map(s => `
                  <div class="modal-source-pill">
                    ${UI_ICONS.book} <strong>${s.book}</strong> &mdash; ${s.chapter || s.lesson || ''} ${s.notes ? `(${s.notes})` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="modal-readings-grid">
        <div class="modal-reading-box">
          <div class="reading-title">On'yomi (音読み - Chinese Reading)</div>
          <div class="reading-content">${kanji.onyomi || '—'}</div>
        </div>
        <div class="modal-reading-box">
          <div class="reading-title">Kun'yomi (訓読み - Japanese Reading)</div>
          <div class="reading-content">${kanji.kunyomi || '—'}</div>
        </div>
      </div>

      <div class="modal-examples-section">
        <div class="modal-section-title">
          <div class="ex-title-left">
            <span>Target Vocabulary & Compounds (熟語)</span>
            <span class="count-chip">${examples.length} Unique Words</span>
          </div>
          ${breakdownText ? `<div class="modal-vocab-breakdown">(${breakdownText})</div>` : ''}
        </div>

        ${distinctLevels.length > 1 ? `
          <div class="modal-compound-filter-bar">
            <span class="filter-mini-label">Filter Vocab:</span>
            <button class="modal-filter-btn active" data-modal-filter="ALL">All (${examples.length})</button>
            ${distinctLevels.map(lvl => `
              <button class="modal-filter-btn" data-modal-filter="${lvl}">
                <span class="level-badge badge-${lvl.toLowerCase()}">${lvl}</span> (${levelCounts[lvl]})
              </button>
            `).join('')}
          </div>
        ` : ''}
        
        <div id="modal-examples-container" class="modal-examples-list"></div>
      </div>

      <div class="modal-footer-actions">
        <button class="btn-secondary" data-bookmark-id="${kanji.id}">
          ${isBookmarked ? `${UI_ICONS.starFilled} Bookmarked` : `${UI_ICONS.starOutline} Add to Bookmarks`}
        </button>
      </div>
    `;

    renderModalExamples(examples, state.selectedLevel);

    // Setup modal compound filter listeners
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

  function closeModal() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // --- 2. VOCABULARY RENDERER ---
  function renderVocabulary() {
    const list = document.getElementById('vocab-list');
    const countTag = document.getElementById('vocab-count');
    const breakdownTag = document.getElementById('vocab-origin-breakdown');
    if (!list) return;

    const items = filterItems(window.JLPT_DATA.vocabulary, ['word', 'reading', 'romaji', 'meaning'], 'vocabulary');

    if (countTag) countTag.textContent = `${items.length} Words displayed`;

    if (breakdownTag && window.JLPT_DATA.getLevelStats) {
      const stats = window.JLPT_DATA.getLevelStats('vocabulary', state.selectedLevel);
      if (state.selectedLevel === 'ALL') {
        breakdownTag.textContent = `(${stats.total} total across all levels)`;
      } else {
        breakdownTag.innerHTML = `&bull; <strong>${stats.newCount}</strong> New in ${state.selectedLevel} &bull; <strong>${stats.reviewCount}</strong> Review`;
      }
    }

    if (items.length === 0) {
      list.innerHTML = `<div class="empty-state card-glass"><p>No vocabulary words found matching current filters.</p></div>`;
      return;
    }

    list.innerHTML = items.map(v => {
      const isBookmarked = state.bookmarks.has(v.id);
      return `
        <div class="vocab-card card-glass">
          <div class="vocab-top">
            <div class="vocab-badges">
              ${renderLevelPills(v.levels || [v.level])}
              ${renderOriginBadge(v)}
            </div>
            <div class="vocab-actions">
              <button class="action-btn" data-speak="${v.word}" title="Listen">${UI_ICONS.volume}</button>
              <button class="action-btn" data-bookmark-id="${v.id}" title="Bookmark">
                ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
              </button>
            </div>
          </div>

          <div class="vocab-main">
            <span class="vocab-word">${v.word}</span>
            <span class="vocab-reading">【${v.reading}】</span>
          </div>

          <div class="vocab-romaji">${v.romaji || ''}</div>
          <div class="vocab-meaning">${v.meaning || ''}</div>

          ${v.example ? `
            <div class="vocab-example-box">
              <p class="vocab-ex-ja">${parseFurigana(v.example.furigana)}</p>
              <p class="vocab-ex-en">${v.example.en}</p>
            </div>
          ` : ''}

          ${renderSourcesHtml(v.sources)}
        </div>
      `;
    }).join('');
  }

  // --- 3. GRAMMAR RENDERER ---
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

    if (items.length === 0) {
      list.innerHTML = `<div class="empty-state card-glass"><p>No grammar points found matching current filters.</p></div>`;
      return;
    }

    list.innerHTML = items.map(g => {
      const isBookmarked = state.bookmarks.has(g.id);
      return `
        <div class="grammar-card card-glass">
          <div class="grammar-top">
            <div class="grammar-badges">
              ${renderLevelPills(g.levels || [g.level])}
              ${renderOriginBadge(g)}
            </div>
            <div class="grammar-actions">
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
    }).join('');
  }

  // --- 4. FLASHCARDS ENGINE ---
  function buildFlashcardDeck() {
    let items = [];
    const cat = state.flashcards.category;

    if (cat === 'kanji') {
      items = window.JLPT_DATA.kanji.filter(matchLevel);
    } else if (cat === 'vocab') {
      items = window.JLPT_DATA.vocabulary.filter(matchLevel);
    } else if (cat === 'grammar') {
      items = window.JLPT_DATA.grammar.filter(matchLevel);
    }

    state.flashcards.deck = items;
    state.flashcards.currentIndex = 0;
    state.flashcards.isFlipped = false;
  }

  function renderFlashcard() {
    const cardEl = document.getElementById('flashcard-element');
    const indexDisplay = document.getElementById('fc-index-display');
    const totalDisplay = document.getElementById('fc-total-display');
    const progressFill = document.getElementById('fc-progress-fill');
    if (!cardEl) return;

    const deck = state.flashcards.deck;
    const total = deck.length;
    const idx = state.flashcards.currentIndex;

    if (indexDisplay) indexDisplay.textContent = total > 0 ? idx + 1 : 0;
    if (totalDisplay) totalDisplay.textContent = total;
    if (progressFill) {
      const pct = total > 0 ? ((idx + 1) / total) * 100 : 0;
      progressFill.style.width = `${pct}%`;
    }

    if (total === 0) {
      cardEl.querySelector('.fc-front').innerHTML = `<div class="fc-empty"><p>No cards available for ${state.selectedLevel}.</p></div>`;
      cardEl.querySelector('.fc-back').innerHTML = `<div class="fc-empty"><p>Select another level.</p></div>`;
      return;
    }

    const item = deck[idx];
    const cat = state.flashcards.category;

    cardEl.classList.toggle('flipped', state.flashcards.isFlipped);

    if (cat === 'kanji') {
      cardEl.querySelector('.fc-front').innerHTML = `
        <div class="fc-badges-top">${renderLevelPills(item.levels)}</div>
        <div class="fc-kanji-char">${item.char}</div>
        <div class="fc-hint">Click card to reveal readings & meaning</div>
      `;
      cardEl.querySelector('.fc-back').innerHTML = `
        <div class="fc-meaning">${item.meaning}</div>
        <div class="fc-readings">
          ${item.onyomi ? `<div><span class="fc-r-label">ON:</span> ${item.onyomi}</div>` : ''}
          ${item.kunyomi ? `<div><span class="fc-r-label">KUN:</span> ${item.kunyomi}</div>` : ''}
        </div>
        ${item.examples && item.examples.length > 0 ? `
          <div class="fc-example-preview">
            <span>Example: <strong>${item.examples[0].word}</strong> 【${item.examples[0].reading}】 (${item.examples[0].meaning})</span>
          </div>
        ` : ''}
      `;
    } else if (cat === 'vocab') {
      cardEl.querySelector('.fc-front').innerHTML = `
        <div class="fc-badges-top">${renderLevelPills(item.levels || [item.level])}</div>
        <div class="fc-vocab-word">${item.word}</div>
        <div class="fc-hint">Click to reveal reading & English</div>
      `;
      cardEl.querySelector('.fc-back').innerHTML = `
        <div class="fc-vocab-reading">【${item.reading}】</div>
        <div class="fc-meaning">${item.meaning}</div>
        ${item.romaji ? `<div class="fc-romaji">${item.romaji}</div>` : ''}
      `;
    } else if (cat === 'grammar') {
      cardEl.querySelector('.fc-front').innerHTML = `
        <div class="fc-badges-top">${renderLevelPills(item.levels || [item.level])}</div>
        <div class="fc-grammar-pattern">${item.pattern}</div>
        <div class="fc-hint">Click to reveal meaning & structure</div>
      `;
      cardEl.querySelector('.fc-back').innerHTML = `
        <div class="fc-meaning">${item.meaning}</div>
        ${item.structure ? `<div class="fc-structure"><code>${item.structure}</code></div>` : ''}
        <div class="fc-explanation">${item.explanation || ''}</div>
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

    if (saved.length === 0) {
      list.innerHTML = `
        <div class="empty-state card-glass" style="grid-column: 1 / -1;">
          <p>No bookmarked items yet. Click the star icon on any Kanji, word, or grammar rule to save it here!</p>
        </div>
      `;
      return;
    }

    list.innerHTML = saved.map(item => {
      const isKanji = !!item.char;
      const isVocab = !!item.word;

      return `
        <div class="bookmark-card card-glass">
          <div class="bm-header">
            <div class="bm-type-badge">${isKanji ? 'Kanji' : isVocab ? 'Vocab' : 'Grammar'}</div>
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
    }).join('');
  }

  // --- EXPOSE API GLOBALLY ---
  window.NihonHub = {
    selectLevel: (lvl) => {
      state.selectedLevel = lvl;
      document.querySelectorAll('.level-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-level') === lvl);
      });
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
      state.filters.kanji = { book: 'ALL', chapter: 'ALL' };
      state.filters.vocabulary = { book: 'ALL', chapter: 'ALL' };
      state.filters.grammar = { book: 'ALL', chapter: 'ALL' };
      const s = document.getElementById('global-search-input');
      if (s) s.value = '';
      document.querySelectorAll('.level-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-level') === 'ALL'));
      document.querySelectorAll('.origin-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-origin') === 'ALL'));
      renderAll();
    },
    switchTab: switchTab,
    openKanjiModal: openKanjiModal,
    speakJapanese: speakJapanese,
    toggleBookmark: toggleBookmark
  };

})();

/**
 * NihonHub - Interactive Application Engine
 * All-in-One JLPT N5 to N2 Japanese Learning Experience
 */

(function () {
  'use strict';

  // --- SVG ICON REPOSITORY ---
  const UI_ICONS = {
    volume: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    starOutline: `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starFilled: `<svg class="ui-icon text-warning" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    check: `<svg class="ui-icon text-success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    circle: `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>`,
    sun: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
  };

  // --- APPLICATION STATE ---
  const state = {
    currentTab: 'dashboard',
    selectedLevel: 'ALL', // 'ALL', 'N5', 'N4', 'N3', 'N2'
    cumulativeMode: true, // If true and level=N2, includes N5, N4, N3, N2
    searchQuery: '',
    showFurigana: true,
    showRomaji: true,
    theme: 'dark',
    bookmarks: new Set(),
    mastered: new Set(),
    studyStreak: 1,
    lastStudyDate: '',
    
    // Flashcard state
    flashcards: {
      deck: [],
      currentIndex: 0,
      isFlipped: false,
      category: 'all', // 'all', 'kanji', 'vocab', 'grammar'
      level: 'ALL',
      studiedCount: 0
    },

    // Quiz state
    quiz: {
      active: false,
      questions: [],
      currentIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timer: 30,
      timerInterval: null,
      results: []
    },

    // Modal state
    activeModal: null
  };

  // Level hierarchy for cumulative logic
  const LEVEL_ORDER = { 'N5': 1, 'N4': 2, 'N3': 3, 'N2': 4 };

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    initTheme();
    updateStreak();
    setupEventListeners();
    buildFlashcardDeck();
    renderAll();
  });

  // --- LOCAL STORAGE PERSISTENCE ---
  function loadPreferences() {
    try {
      const savedTheme = localStorage.getItem('nihon_theme');
      if (savedTheme) state.theme = savedTheme;

      const savedFurigana = localStorage.getItem('nihon_furigana');
      if (savedFurigana !== null) state.showFurigana = savedFurigana === 'true';

      const savedRomaji = localStorage.getItem('nihon_romaji');
      if (savedRomaji !== null) state.showRomaji = savedRomaji === 'true';

      const savedCumulative = localStorage.getItem('nihon_cumulative');
      if (savedCumulative !== null) state.cumulativeMode = savedCumulative === 'true';

      const savedBookmarks = localStorage.getItem('nihon_bookmarks');
      if (savedBookmarks) state.bookmarks = new Set(JSON.parse(savedBookmarks));

      const savedMastered = localStorage.getItem('nihon_mastered');
      if (savedMastered) state.mastered = new Set(JSON.parse(savedMastered));

      const savedStreak = localStorage.getItem('nihon_streak');
      if (savedStreak) state.studyStreak = parseInt(savedStreak, 10) || 1;

      state.lastStudyDate = localStorage.getItem('nihon_last_study_date') || '';
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem('nihon_theme', state.theme);
      localStorage.setItem('nihon_furigana', state.showFurigana);
      localStorage.setItem('nihon_romaji', state.showRomaji);
      localStorage.setItem('nihon_cumulative', state.cumulativeMode);
      localStorage.setItem('nihon_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
      localStorage.setItem('nihon_mastered', JSON.stringify(Array.from(state.mastered)));
      localStorage.setItem('nihon_streak', state.studyStreak);
      localStorage.setItem('nihon_last_study_date', state.lastStudyDate);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (!state.lastStudyDate) {
      state.studyStreak = 1;
      state.lastStudyDate = today;
    } else if (state.lastStudyDate !== today) {
      const last = new Date(state.lastStudyDate);
      const now = new Date(today);
      const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        state.studyStreak += 1;
      } else if (diffDays > 1) {
        state.studyStreak = 1;
      }
      state.lastStudyDate = today;
    }
    savePreferences();
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

  // --- AUDIO SYNTHESIS ---
  function speakJapanese(text) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\[.*?\]/g, '').replace(/[\/〜～]/g, '').trim();
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

  // --- FILTERING ENGINE (CUMULATIVE LOGIC) ---
  function matchLevel(itemLevel) {
    if (state.selectedLevel === 'ALL') return true;
    if (!state.cumulativeMode) {
      return itemLevel === state.selectedLevel;
    }
    const currentThreshold = LEVEL_ORDER[state.selectedLevel] || 4;
    const itemRank = LEVEL_ORDER[itemLevel] || 1;
    return itemRank <= currentThreshold;
  }

  function filterItems(items, searchFields = []) {
    const q = state.searchQuery.trim().toLowerCase();
    return items.filter(item => {
      if (!matchLevel(item.level)) return false;
      if (!q) return true;
      return searchFields.some(field => {
        const val = item[field];
        if (typeof val === 'string') return val.toLowerCase().includes(q);
        if (Array.isArray(val)) {
          return val.some(v => typeof v === 'string' ? v.toLowerCase().includes(q) : JSON.stringify(v).toLowerCase().includes(q));
        }
        return false;
      });
    });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Nav tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    // Level selector buttons
    document.querySelectorAll('.level-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.level-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.selectedLevel = e.currentTarget.getAttribute('data-level');
        buildFlashcardDeck();
        renderAll();
      });
    });

    // Cumulative Toggle
    const cumulativeToggle = document.getElementById('cumulative-toggle');
    if (cumulativeToggle) {
      cumulativeToggle.checked = state.cumulativeMode;
      cumulativeToggle.addEventListener('change', (e) => {
        state.cumulativeMode = e.target.checked;
        savePreferences();
        buildFlashcardDeck();
        renderAll();
      });
    }

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
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderActiveTab();
      });
    }

    // Flashcard controls
    const fcCard = document.getElementById('flashcard-element');
    if (fcCard) {
      fcCard.addEventListener('click', flipFlashcard);
    }
    const fcPrev = document.getElementById('fc-prev-btn');
    if (fcPrev) fcPrev.addEventListener('click', prevFlashcard);
    const fcNext = document.getElementById('fc-next-btn');
    if (fcNext) fcNext.addEventListener('click', nextFlashcard);
    const fcFlip = document.getElementById('fc-flip-btn');
    if (fcFlip) fcFlip.addEventListener('click', flipFlashcard);
    const fcShuffle = document.getElementById('fc-shuffle-btn');
    if (fcShuffle) fcShuffle.addEventListener('click', shuffleFlashcards);

    // Flashcard Category Filter
    document.querySelectorAll('.fc-category-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.fc-category-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.flashcards.category = e.currentTarget.getAttribute('data-category');
        buildFlashcardDeck();
        renderFlashcard();
      });
    });

    // Quiz Controls
    const startQuizBtn = document.getElementById('start-quiz-btn');
    if (startQuizBtn) {
      startQuizBtn.addEventListener('click', startQuiz);
    }
    const restartQuizBtn = document.getElementById('quiz-restart-btn');
    if (restartQuizBtn) {
      restartQuizBtn.addEventListener('click', startQuiz);
    }

    // Modal Close buttons
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
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (e.key === 'Escape') e.target.blur();
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        const search = document.getElementById('global-search-input');
        if (search) search.focus();
      } else if (e.key === 'Escape') {
        closeModal();
      } else if (state.currentTab === 'flashcards') {
        if (e.code === 'Space') {
          e.preventDefault();
          flipFlashcard();
        } else if (e.key === 'ArrowRight' || e.key === 'j') {
          nextFlashcard();
        } else if (e.key === 'ArrowLeft' || e.key === 'k') {
          prevFlashcard();
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          rateFlashcard(parseInt(e.key, 10));
        }
      }
    });

    // Delegated actions
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

      const masterBtn = e.target.closest('[data-master-id]');
      if (masterBtn) {
        e.stopPropagation();
        toggleMastered(masterBtn.getAttribute('data-master-id'));
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

  // --- RENDER ALL VIEWS ---
  function renderAll() {
    renderDashboard();
    renderKanji();
    renderVocabulary();
    renderGrammar();
    renderKana();
    renderBookmarks();
    renderFlashcard();
    updateHeaderBadges();
  }

  function renderActiveTab() {
    switch (state.currentTab) {
      case 'dashboard': renderDashboard(); break;
      case 'kanji': renderKanji(); break;
      case 'vocab': renderVocabulary(); break;
      case 'grammar': renderGrammar(); break;
      case 'flashcards': renderFlashcard(); break;
      case 'kana': renderKana(); break;
      case 'bookmarks': renderBookmarks(); break;
    }
  }

  function updateHeaderBadges() {
    const streakEl = document.getElementById('streak-count-badge');
    if (streakEl) streakEl.textContent = `${state.studyStreak} Day Streak`;

    const masteredEl = document.getElementById('mastered-count-badge');
    if (masteredEl) masteredEl.textContent = `${state.mastered.size} Mastered`;
  }

  // --- DASHBOARD RENDERER ---
  function renderDashboard() {
    const totalKanji = JLPT_DATA.kanji.length;
    const totalVocab = JLPT_DATA.vocabulary.length;
    const totalGrammar = JLPT_DATA.grammar.length;
    const totalItems = totalKanji + totalVocab + totalGrammar;

    const masteredCount = state.mastered.size;
    const overallProgress = totalItems > 0 ? Math.min(100, Math.round((masteredCount / totalItems) * 100)) : 0;

    const overallProgressEl = document.getElementById('dash-overall-progress');
    if (overallProgressEl) overallProgressEl.textContent = `${overallProgress}%`;

    const overallProgressBar = document.getElementById('dash-overall-bar');
    if (overallProgressBar) overallProgressBar.style.width = `${overallProgress}%`;

    const levelStatsGrid = document.getElementById('dash-level-stats');
    if (levelStatsGrid) {
      levelStatsGrid.innerHTML = JLPT_DATA.levels.map(lvl => {
        const lvlKanji = JLPT_DATA.kanji.filter(k => k.level === lvl.id).length;
        const lvlVocab = JLPT_DATA.vocabulary.filter(v => v.level === lvl.id).length;
        const lvlGrammar = JLPT_DATA.grammar.filter(g => g.level === lvl.id).length;
        const totalLvlItems = lvlKanji + lvlVocab + lvlGrammar;

        const masteredLvl = Array.from(state.mastered).filter(id => {
          const item = [...JLPT_DATA.kanji, ...JLPT_DATA.vocabulary, ...JLPT_DATA.grammar].find(x => x.id === id);
          return item && item.level === lvl.id;
        }).length;

        const pct = totalLvlItems > 0 ? Math.round((masteredLvl / totalLvlItems) * 100) : 0;

        return `
          <div class="level-stat-card card-glass" onclick="window.NihonHub.selectLevel('${lvl.id}')">
            <div class="level-badge badge-${lvl.id.toLowerCase()}">${lvl.id}</div>
            <h3 class="stat-level-title">${lvl.title}</h3>
            <p class="stat-level-desc">${lvl.desc}</p>
            <div class="stat-counts">
              <span><strong>${lvlKanji}</strong> 漢字 Kanji</span>
              <span><strong>${lvlVocab}</strong> 語彙 Vocab</span>
              <span><strong>${lvlGrammar}</strong> 文法 Grammar</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${pct}%"></div>
            </div>
            <div class="stat-card-footer">
              <span class="stat-pct">${pct}% Mastered</span>
              <span class="stat-action">Explore &rarr;</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // Daily Featured Word & Grammar
    const featWord = JLPT_DATA.vocabulary[0];
    const featGrammar = JLPT_DATA.grammar[0];

    const featWordContainer = document.getElementById('dash-featured-word');
    if (featWordContainer && featWord) {
      featWordContainer.innerHTML = `
        <div class="featured-card card-glass">
          <div class="featured-tag">Word of the Day (${featWord.level})</div>
          <div class="featured-main">
            <span class="japanese-heading lg">${featWord.word}</span>
            <span class="kana-sub">【${featWord.reading}】</span>
            <button class="audio-btn" data-speak="${featWord.word}" title="Listen pronunciation">${UI_ICONS.volume}</button>
          </div>
          <p class="featured-romaji">${featWord.romaji}</p>
          <p class="featured-meaning">${featWord.meaning}</p>
          <div class="featured-example">
            <p class="ja-example">${parseFurigana(featWord.example.furigana)}</p>
            <p class="en-example">${featWord.example.en}</p>
          </div>
        </div>
      `;
    }

    const featGrammarContainer = document.getElementById('dash-featured-grammar');
    if (featGrammarContainer && featGrammar) {
      featGrammarContainer.innerHTML = `
        <div class="featured-card card-glass">
          <div class="featured-tag">Grammar of the Day (${featGrammar.level})</div>
          <div class="featured-main">
            <span class="japanese-heading md">${featGrammar.pattern}</span>
            <button class="audio-btn" data-speak="${featGrammar.pattern}" title="Listen pronunciation">${UI_ICONS.volume}</button>
          </div>
          <p class="featured-meaning">${featGrammar.meaning}</p>
          <div class="grammar-formula-chip">${featGrammar.formula}</div>
          <div class="featured-example">
            <p class="ja-example">${parseFurigana(featGrammar.examples[0].furigana)}</p>
            <p class="en-example">${featGrammar.examples[0].en}</p>
          </div>
        </div>
      `;
    }
  }

  // --- KANJI RENDERER ---
  function renderKanji() {
    const container = document.getElementById('kanji-grid');
    if (!container) return;

    const filtered = filterItems(JLPT_DATA.kanji, ['char', 'meaning', 'onyomi', 'kunyomi', 'level']);
    const countEl = document.getElementById('kanji-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} Kanji (${getActiveLevelLabel()})`;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state">No Kanji found matching your filters.</div>`;
      return;
    }

    container.innerHTML = filtered.map(k => {
      const isBookmarked = state.bookmarks.has(k.id);
      const isMastered = state.mastered.has(k.id);
      return `
        <div class="kanji-card card-glass ${isMastered ? 'is-mastered' : ''}" data-kanji-modal-id="${k.id}">
          <div class="card-top-actions">
            <span class="level-badge badge-${k.level.toLowerCase()}">${k.level}</span>
            <div class="card-action-icons">
              <button class="icon-btn ${isBookmarked ? 'active' : ''}" data-bookmark-id="${k.id}" title="Bookmark">
                ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
              </button>
              <button class="icon-btn ${isMastered ? 'active' : ''}" data-master-id="${k.id}" title="Mark as Mastered">
                ${isMastered ? UI_ICONS.check : UI_ICONS.circle}
              </button>
            </div>
          </div>
          <div class="kanji-character-big">${k.char}</div>
          <div class="kanji-meaning">${k.meaning}</div>
          <div class="kanji-readings">
            <div class="reading-row">
              <span class="reading-label">音:</span>
              <span class="reading-val">${k.onyomi || '-'}</span>
            </div>
            <div class="reading-row">
              <span class="reading-label">訓:</span>
              <span class="reading-val">${k.kunyomi || '-'}</span>
            </div>
          </div>
          <div class="kanji-card-footer">
            <span>${k.strokes} strokes</span>
            <button class="audio-btn sm" data-speak="${k.char}" title="Pronounce">${UI_ICONS.volume}</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- VOCABULARY RENDERER ---
  function renderVocabulary() {
    const container = document.getElementById('vocab-list');
    if (!container) return;

    const filtered = filterItems(JLPT_DATA.vocabulary, ['word', 'reading', 'romaji', 'meaning', 'level', 'pos']);
    const countEl = document.getElementById('vocab-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} Words (${getActiveLevelLabel()})`;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state">No vocabulary found matching your filters.</div>`;
      return;
    }

    container.innerHTML = filtered.map(v => {
      const isBookmarked = state.bookmarks.has(v.id);
      const isMastered = state.mastered.has(v.id);
      return `
        <div class="vocab-card card-glass ${isMastered ? 'is-mastered' : ''}">
          <div class="vocab-main-col">
            <div class="vocab-header-row">
              <span class="level-badge badge-${v.level.toLowerCase()}">${v.level}</span>
              <span class="pos-badge">${v.pos}</span>
            </div>
            <div class="vocab-word-row">
              <span class="vocab-word">${v.word}</span>
              <span class="vocab-reading">【${v.reading}】</span>
              <button class="audio-btn" data-speak="${v.word}" title="Listen">${UI_ICONS.volume}</button>
            </div>
            <div class="vocab-romaji">${v.romaji}</div>
            <div class="vocab-meaning">${v.meaning}</div>
            <div class="vocab-example-box">
              <p class="ja-example">${parseFurigana(v.example.furigana)}</p>
              <p class="en-example">${v.example.en}</p>
            </div>
          </div>
          <div class="card-side-actions">
            <button class="icon-btn ${isBookmarked ? 'active' : ''}" data-bookmark-id="${v.id}" title="Bookmark">
              ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
            </button>
            <button class="icon-btn ${isMastered ? 'active' : ''}" data-master-id="${v.id}" title="Mark Mastered">
              ${isMastered ? UI_ICONS.check : UI_ICONS.circle}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- GRAMMAR RENDERER ---
  function renderGrammar() {
    const container = document.getElementById('grammar-list');
    if (!container) return;

    const filtered = filterItems(JLPT_DATA.grammar, ['pattern', 'meaning', 'formula', 'explanation', 'nuance', 'level']);
    const countEl = document.getElementById('grammar-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} Grammar Points (${getActiveLevelLabel()})`;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state">No grammar points found matching your filters.</div>`;
      return;
    }

    container.innerHTML = filtered.map(g => {
      const isBookmarked = state.bookmarks.has(g.id);
      const isMastered = state.mastered.has(g.id);
      return `
        <div class="grammar-card card-glass ${isMastered ? 'is-mastered' : ''}">
          <div class="grammar-header">
            <div class="grammar-title-row">
              <span class="level-badge badge-${g.level.toLowerCase()}">${g.level}</span>
              <span class="grammar-pattern">${g.pattern}</span>
              <button class="audio-btn" data-speak="${g.pattern}" title="Listen">${UI_ICONS.volume}</button>
            </div>
            <div class="card-action-icons">
              <button class="icon-btn ${isBookmarked ? 'active' : ''}" data-bookmark-id="${g.id}" title="Bookmark">
                ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
              </button>
              <button class="icon-btn ${isMastered ? 'active' : ''}" data-master-id="${g.id}" title="Mark Mastered">
                ${isMastered ? UI_ICONS.check : UI_ICONS.circle}
              </button>
            </div>
          </div>
          <div class="grammar-meaning">${g.meaning}</div>
          <div class="grammar-formula">
            <span class="formula-label">Structure:</span>
            <code>${g.formula}</code>
          </div>
          <p class="grammar-explanation">${g.explanation}</p>
          ${g.nuance ? `<div class="grammar-nuance"><span class="nuance-tag">Nuance:</span> ${g.nuance}</div>` : ''}
          <div class="grammar-examples">
            <div class="examples-header">Example Sentences:</div>
            ${g.examples.map(ex => `
              <div class="example-item">
                <div class="example-ja-row">
                  <span class="ja-example">${parseFurigana(ex.furigana)}</span>
                  <button class="audio-btn sm" data-speak="${ex.ja}" title="Listen sentence">${UI_ICONS.volume}</button>
                </div>
                <div class="en-example">${ex.en}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // --- KANA RENDERER ---
  function renderKana() {
    const hContainer = document.getElementById('hiragana-grid');
    const kContainer = document.getElementById('katakana-grid');

    if (hContainer) {
      hContainer.innerHTML = JLPT_DATA.kana.hiragana.map(k => {
        if (!k.char) return `<div class="kana-cell empty"></div>`;
        return `
          <div class="kana-cell card-glass" data-speak="${k.char}">
            <div class="kana-char">${k.char}</div>
            <div class="kana-romaji">${k.romaji}</div>
          </div>
        `;
      }).join('');
    }

    if (kContainer) {
      kContainer.innerHTML = JLPT_DATA.kana.katakana.map(k => {
        if (!k.char) return `<div class="kana-cell empty"></div>`;
        return `
          <div class="kana-cell card-glass" data-speak="${k.char}">
            <div class="kana-char">${k.char}</div>
            <div class="kana-romaji">${k.romaji}</div>
          </div>
        `;
      }).join('');
    }
  }

  // --- BOOKMARKS RENDERER ---
  function renderBookmarks() {
    const container = document.getElementById('bookmarks-list');
    if (!container) return;

    const allItems = [...JLPT_DATA.kanji, ...JLPT_DATA.vocabulary, ...JLPT_DATA.grammar];
    const bookmarkedItems = allItems.filter(item => state.bookmarks.has(item.id));
    const countEl = document.getElementById('bookmark-count');
    if (countEl) countEl.textContent = `${bookmarkedItems.length} Saved Items`;

    if (bookmarkedItems.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>You have no bookmarked items yet.</p>
          <p class="sub-text">Click the bookmark icon on any Kanji, Word, or Grammar point to save it for quick review.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarkedItems.map(item => {
      const type = item.char ? 'Kanji' : item.word ? 'Vocabulary' : 'Grammar';
      const mainText = item.char || item.word || item.pattern;
      const subText = item.meaning;
      return `
        <div class="bookmark-card card-glass">
          <div class="bm-left">
            <span class="level-badge badge-${item.level.toLowerCase()}">${item.level}</span>
            <span class="bm-type-badge">${type}</span>
            <span class="bm-main-text">${mainText}</span>
            <span class="bm-sub-text">${subText}</span>
          </div>
          <div class="bm-right">
            <button class="audio-btn" data-speak="${mainText}" title="Listen">${UI_ICONS.volume}</button>
            <button class="icon-btn active" data-bookmark-id="${item.id}" title="Remove Bookmark">${UI_ICONS.starFilled}</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- FLASHCARD ENGINE ---
  function buildFlashcardDeck() {
    let pool = [];
    const cat = state.flashcards.category;

    if (cat === 'all' || cat === 'kanji') {
      pool.push(...JLPT_DATA.kanji.filter(k => matchLevel(k.level)).map(k => ({
        type: 'Kanji',
        id: k.id,
        level: k.level,
        frontMain: k.char,
        frontSub: `Strokes: ${k.strokes} | Radical: ${k.radical}`,
        backMain: k.meaning,
        backDetails: `音: ${k.onyomi || '-'} | 訓: ${k.kunyomi || '-'}`,
        examples: k.examples.map(ex => `${ex.word} (${ex.reading}): ${ex.meaning}`).join('<br>'),
        speakText: k.char
      })));
    }

    if (cat === 'all' || cat === 'vocab') {
      pool.push(...JLPT_DATA.vocabulary.filter(v => matchLevel(v.level)).map(v => ({
        type: 'Vocabulary',
        id: v.id,
        level: v.level,
        frontMain: v.word,
        frontSub: `【${v.reading}】 • ${v.romaji}`,
        backMain: v.meaning,
        backDetails: `Part of Speech: ${v.pos}`,
        examples: `${parseFurigana(v.example.furigana)}<br><small>${v.example.en}</small>`,
        speakText: v.word
      })));
    }

    if (cat === 'all' || cat === 'grammar') {
      pool.push(...JLPT_DATA.grammar.filter(g => matchLevel(g.level)).map(g => ({
        type: 'Grammar',
        id: g.id,
        level: g.level,
        frontMain: g.pattern,
        frontSub: g.formula,
        backMain: g.meaning,
        backDetails: g.explanation,
        examples: `${parseFurigana(g.examples[0].furigana)}<br><small>${g.examples[0].en}</small>`,
        speakText: g.pattern
      })));
    }

    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    state.flashcards.deck = pool;
    state.flashcards.currentIndex = 0;
    state.flashcards.isFlipped = false;
  }

  function renderFlashcard() {
    const cardEl = document.getElementById('flashcard-element');
    const indexEl = document.getElementById('fc-index-display');
    const totalEl = document.getElementById('fc-total-display');
    const progressFill = document.getElementById('fc-progress-fill');

    if (!cardEl) return;

    const deck = state.flashcards.deck;
    if (deck.length === 0) {
      cardEl.innerHTML = `<div class="card-glass empty-deck">No cards available for this filter.</div>`;
      if (indexEl) indexEl.textContent = '0';
      if (totalEl) totalEl.textContent = '0';
      return;
    }

    const currentCard = deck[state.flashcards.currentIndex];
    const total = deck.length;
    const currentNum = state.flashcards.currentIndex + 1;

    if (indexEl) indexEl.textContent = currentNum;
    if (totalEl) totalEl.textContent = total;
    if (progressFill) progressFill.style.width = `${(currentNum / total) * 100}%`;

    cardEl.classList.toggle('flipped', state.flashcards.isFlipped);

    // Front Content
    const frontEl = cardEl.querySelector('.fc-front');
    if (frontEl) {
      frontEl.innerHTML = `
        <div class="fc-card-top">
          <span class="level-badge badge-${currentCard.level.toLowerCase()}">${currentCard.level}</span>
          <span class="fc-type-tag">${currentCard.type}</span>
          <button class="audio-btn" data-speak="${currentCard.speakText}" title="Pronounce">${UI_ICONS.volume}</button>
        </div>
        <div class="fc-front-main">${currentCard.frontMain}</div>
        <div class="fc-front-sub">${currentCard.frontSub}</div>
        <div class="fc-hint-tap">Click or press Space to reveal answer</div>
      `;
    }

    // Back Content
    const backEl = cardEl.querySelector('.fc-back');
    if (backEl) {
      backEl.innerHTML = `
        <div class="fc-card-top">
          <span class="level-badge badge-${currentCard.level.toLowerCase()}">${currentCard.level}</span>
          <span class="fc-type-tag">${currentCard.type}</span>
          <button class="audio-btn" data-speak="${currentCard.speakText}" title="Pronounce">${UI_ICONS.volume}</button>
        </div>
        <div class="fc-back-meaning">${currentCard.backMain}</div>
        <div class="fc-back-details">${currentCard.backDetails}</div>
        <div class="fc-back-examples">
          <strong>Context & Examples:</strong>
          <div>${currentCard.examples}</div>
        </div>
      `;
    }
  }

  function flipFlashcard() {
    state.flashcards.isFlipped = !state.flashcards.isFlipped;
    const cardEl = document.getElementById('flashcard-element');
    if (cardEl) {
      cardEl.classList.toggle('flipped', state.flashcards.isFlipped);
    }
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
    buildFlashcardDeck();
    renderFlashcard();
  }

  function rateFlashcard(rating) {
    const currentCard = state.flashcards.deck[state.flashcards.currentIndex];
    if (rating >= 3 && currentCard) {
      state.mastered.add(currentCard.id);
    }
    savePreferences();
    updateHeaderBadges();
    nextFlashcard();
  }

  // --- QUIZ & MOCK EXAM ENGINE ---
  function startQuiz() {
    const levelSelect = document.getElementById('quiz-level-select');
    const selectedLevel = levelSelect ? levelSelect.value : 'ALL';

    let questions = JLPT_DATA.quizzes.filter(q => {
      if (selectedLevel === 'ALL') return true;
      if (state.cumulativeMode) {
        return (LEVEL_ORDER[q.level] || 1) <= (LEVEL_ORDER[selectedLevel] || 4);
      }
      return q.level === selectedLevel;
    });

    if (questions.length === 0) {
      questions = JLPT_DATA.quizzes;
    }

    questions = [...questions].sort(() => Math.random() - 0.5);

    state.quiz = {
      active: true,
      questions: questions,
      currentIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timer: 30,
      timerInterval: null,
      results: []
    };

    document.getElementById('quiz-intro-screen')?.classList.add('hidden');
    document.getElementById('quiz-results-screen')?.classList.add('hidden');
    document.getElementById('quiz-active-screen')?.classList.remove('hidden');

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    clearInterval(state.quiz.timerInterval);
    state.quiz.timer = 30;
    state.quiz.isAnswered = false;
    state.quiz.selectedAnswer = null;

    const q = state.quiz.questions[state.quiz.currentIndex];
    const total = state.quiz.questions.length;
    const currNum = state.quiz.currentIndex + 1;

    document.getElementById('quiz-q-num').textContent = `Question ${currNum} of ${total}`;
    document.getElementById('quiz-q-level').textContent = q.level;
    document.getElementById('quiz-q-level').className = `level-badge badge-${q.level.toLowerCase()}`;
    document.getElementById('quiz-progress-bar').style.width = `${(currNum / total) * 100}%`;

    const qTextEl = document.getElementById('quiz-q-text');
    qTextEl.innerHTML = q.question.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const optionsContainer = document.getElementById('quiz-options-grid');
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn card-glass" data-option-idx="${idx}">
        <span class="opt-prefix">${['A', 'B', 'C', 'D'][idx]}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    const explanationBox = document.getElementById('quiz-explanation-box');
    explanationBox.classList.add('hidden');
    explanationBox.innerHTML = '';

    const nextBtn = document.getElementById('quiz-next-q-btn');
    nextBtn.classList.add('hidden');

    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-option-idx'), 10);
        handleQuizAnswer(idx);
      });
    });

    const timerDisplay = document.getElementById('quiz-timer-display');
    timerDisplay.textContent = state.quiz.timer;
    timerDisplay.classList.remove('urgent');

    state.quiz.timerInterval = setInterval(() => {
      state.quiz.timer--;
      timerDisplay.textContent = state.quiz.timer;
      if (state.quiz.timer <= 5) {
        timerDisplay.classList.add('urgent');
      }
      if (state.quiz.timer <= 0) {
        clearInterval(state.quiz.timerInterval);
        handleQuizTimeout();
      }
    }, 1000);
  }

  function handleQuizAnswer(selectedIdx) {
    if (state.quiz.isAnswered) return;
    clearInterval(state.quiz.timerInterval);
    state.quiz.isAnswered = true;
    state.quiz.selectedAnswer = selectedIdx;

    const q = state.quiz.questions[state.quiz.currentIndex];
    const isCorrect = selectedIdx === q.answerIndex;

    if (isCorrect) state.quiz.score++;

    state.quiz.results.push({
      question: q.question,
      selected: selectedIdx !== null ? q.options[selectedIdx] : 'Timed Out',
      correct: q.options[q.answerIndex],
      isCorrect: isCorrect,
      explanation: q.explanation
    });

    document.querySelectorAll('.quiz-option-btn').forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answerIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('incorrect');
      }
    });

    const explanationBox = document.getElementById('quiz-explanation-box');
    explanationBox.classList.remove('hidden');
    explanationBox.innerHTML = `
      <div class="exp-badge ${isCorrect ? 'exp-correct' : 'exp-wrong'}">
        ${isCorrect ? 'Correct (正解)' : 'Incorrect (不正解)'}
      </div>
      <p class="exp-text">${q.explanation}</p>
    `;

    const nextBtn = document.getElementById('quiz-next-q-btn');
    nextBtn.classList.remove('hidden');
    nextBtn.onclick = () => {
      if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
        state.quiz.currentIndex++;
        renderQuizQuestion();
      } else {
        finishQuiz();
      }
    };
  }

  function handleQuizTimeout() {
    handleQuizAnswer(null);
  }

  function finishQuiz() {
    clearInterval(state.quiz.timerInterval);
    state.quiz.active = false;

    document.getElementById('quiz-active-screen')?.classList.add('hidden');
    document.getElementById('quiz-results-screen')?.classList.remove('hidden');

    const total = state.quiz.questions.length;
    const score = state.quiz.score;
    const percentage = Math.round((score / total) * 100);

    document.getElementById('quiz-score-pct').textContent = `${percentage}%`;
    document.getElementById('quiz-score-fraction').textContent = `${score} / ${total} Correct`;

    const verdictEl = document.getElementById('quiz-verdict-msg');
    if (percentage >= 80) {
      verdictEl.textContent = 'Excellent! You have strong mastery of this level.';
      verdictEl.className = 'quiz-verdict pass';
    } else if (percentage >= 60) {
      verdictEl.textContent = 'Good job! Keep practicing to solidify these concepts.';
      verdictEl.className = 'quiz-verdict warning';
    } else {
      verdictEl.textContent = 'Keep studying! Review flashcards and try again.';
      verdictEl.className = 'quiz-verdict need-work';
    }

    const reviewList = document.getElementById('quiz-review-breakdown');
    if (reviewList) {
      reviewList.innerHTML = state.quiz.results.map((res, i) => `
        <div class="quiz-result-item ${res.isCorrect ? 'correct' : 'incorrect'}">
          <div class="result-q-title"><strong>Q${i + 1}:</strong> ${res.question}</div>
          <div class="result-answer-row">
            <span>Your Answer: <strong class="${res.isCorrect ? 'text-success' : 'text-danger'}">${res.selected}</strong></span>
            ${!res.isCorrect ? `<span>Correct: <strong class="text-success">${res.correct}</strong></span>` : ''}
          </div>
          <div class="result-exp"><small>${res.explanation}</small></div>
        </div>
      `).join('');
    }
  }

  // --- KANJI MODAL ---
  function openKanjiModal(kanjiId) {
    const k = JLPT_DATA.kanji.find(item => item.id === kanjiId);
    if (!k) return;

    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('kanji-modal-body');

    if (!modalBackdrop || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-kanji-header">
        <div class="modal-kanji-char-box">
          <div class="modal-kanji-char">${k.char}</div>
          <button class="audio-btn" data-speak="${k.char}" title="Listen Kanji">${UI_ICONS.volume}</button>
        </div>
        <div class="modal-kanji-meta">
          <div class="modal-tag-row">
            <span class="level-badge badge-${k.level.toLowerCase()}">${k.level}</span>
            <span class="modal-stroke-tag">${k.strokes} Strokes</span>
            <span class="modal-radical-tag">Radical: ${k.radical}</span>
          </div>
          <h2 class="modal-kanji-meaning">${k.meaning}</h2>
          <div class="modal-readings-grid">
            <div class="m-read-box">
              <span class="m-read-label">音読み (On'yomi)</span>
              <span class="m-read-val katakana-text">${k.onyomi || 'None'}</span>
            </div>
            <div class="m-read-box">
              <span class="m-read-label">訓読み (Kun'yomi)</span>
              <span class="m-read-val hiragana-text">${k.kunyomi || 'None'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-section-title">Common Compound Vocabulary (熟語)</div>
      <div class="modal-compounds-list">
        ${k.examples.map(ex => `
          <div class="modal-compound-row">
            <div class="compound-ja">
              <strong>${ex.word}</strong>
              <span class="compound-reading">【${ex.reading}】</span>
              <button class="audio-btn sm" data-speak="${ex.word}" title="Listen">${UI_ICONS.volume}</button>
            </div>
            <div class="compound-en">${ex.meaning}</div>
          </div>
        `).join('')}
      </div>
    `;

    modalBackdrop.classList.remove('hidden');
    state.activeModal = 'kanji';
  }

  function closeModal() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.add('hidden');
    state.activeModal = null;
  }

  // --- ACTIONS (BOOKMARKS & MASTERY) ---
  function toggleBookmark(id) {
    if (state.bookmarks.has(id)) {
      state.bookmarks.delete(id);
    } else {
      state.bookmarks.add(id);
    }
    savePreferences();
    renderAll();
  }

  function toggleMastered(id) {
    if (state.mastered.has(id)) {
      state.mastered.delete(id);
    } else {
      state.mastered.add(id);
    }
    savePreferences();
    renderAll();
  }

  function getActiveLevelLabel() {
    if (state.selectedLevel === 'ALL') return 'All Levels N5-N2';
    if (state.cumulativeMode) {
      return `Cumulative Up to ${state.selectedLevel}`;
    }
    return `${state.selectedLevel} Only`;
  }

  // --- EXPOSE API GLOBALLY ---
  window.NihonHub = {
    selectLevel: (lvl) => {
      state.selectedLevel = lvl;
      document.querySelectorAll('.level-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-level') === lvl);
      });
      buildFlashcardDeck();
      renderAll();
    },
    switchTab: switchTab,
    speakJapanese: speakJapanese,
    toggleBookmark: toggleBookmark,
    toggleMastered: toggleMastered,
    rateCard: rateFlashcard,
    rateFlashcard: rateFlashcard
  };

})();

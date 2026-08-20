/**
 * NihonHub - Interactive Application Engine
 * Clean, User-Friendly JLPT N5 to N2 Learning Platform
 * Supports 739+ Kanji from Sou Matome, Vocabulary, Grammar, Kana, Flashcards, and Bookmarks.
 */

(function () {
  'use strict';

  // --- SVG ICONS ---
  const UI_ICONS = {
    volume: `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    starOutline: `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starFilled: `<svg class="ui-icon text-warning" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    check: `<svg class="ui-icon text-success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    sun: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg class="ui-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    book: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`
  };

  // --- APPLICATION STATE ---
  const state = {
    currentTab: 'kanji',
    selectedLevel: 'ALL',
    selectedWeek: 'ALL',
    searchQuery: '',
    showFurigana: true,
    showRomaji: true,
    theme: 'dark',
    bookmarks: new Set(),

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

  // --- FILTERING ENGINE ---
  function matchLevel(item) {
    if (state.selectedLevel === 'ALL') return true;
    const itemLevels = item.levels || (item.level ? [item.level] : ['N5']);
    return itemLevels.includes(state.selectedLevel);
  }

  function filterItems(items, searchFields = []) {
    const q = state.searchQuery.trim().toLowerCase();
    return items.filter(item => {
      if (!matchLevel(item)) return false;
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
        buildFlashcardDeck();
        renderAll();
      });
    });

    // Kanji Chapter / Week filter pills
    document.querySelectorAll('.week-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.week-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.selectedWeek = e.currentTarget.getAttribute('data-week');
        renderKanji();
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
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
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
    renderKanji();
    renderVocabulary();
    renderGrammar();
    renderKana();
    renderBookmarks();
    renderFlashcard();
  }

  function renderActiveTab() {
    switch (state.currentTab) {
      case 'kanji': renderKanji(); break;
      case 'vocab': renderVocabulary(); break;
      case 'grammar': renderGrammar(); break;
      case 'flashcards': renderFlashcard(); break;
      case 'kana': renderKana(); break;
      case 'bookmarks': renderBookmarks(); break;
    }
  }

  // --- 1. KANJI MATRIX RENDERER ---
  function renderKanji() {
    const grid = document.getElementById('kanji-grid');
    const countTag = document.getElementById('kanji-count');
    if (!grid) return;

    let items = filterItems(window.JLPT_DATA.kanji, ['char', 'meaning', 'onyomi', 'kunyomi', 'radical']);

    // Filter by Week if selected
    if (state.selectedWeek !== 'ALL') {
      items = items.filter(k => {
        if (!Array.isArray(k.sources)) return false;
        return k.sources.some(s => s.chapter && s.chapter.startsWith(state.selectedWeek));
      });
    }

    if (countTag) {
      countTag.textContent = `${items.length} Kanji found`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state card-glass" style="grid-column: 1 / -1;">
          <p>No Kanji found matching your level/search filters.</p>
          <button class="btn-primary" onclick="window.NihonHub.resetFilters()">Reset Filters</button>
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
              ${k.strokes ? `<span class="stroke-badge">${k.strokes} strokes</span>` : ''}
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
  function openKanjiModal(kanjiId) {
    const kanji = window.JLPT_DATA.kanji.find(k => k.id === kanjiId);
    if (!kanji) return;

    const modalBody = document.getElementById('kanji-modal-body');
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (!modalBody || !modalBackdrop) return;

    const isBookmarked = state.bookmarks.has(kanji.id);
    const sourceInfo = kanji.sources && kanji.sources[0] ? kanji.sources[0] : null;

    modalBody.innerHTML = `
      <div class="modal-kanji-header">
        <div class="modal-kanji-char-box">
          <span class="modal-kanji-char">${kanji.char}</span>
          <button class="audio-btn-large" data-speak="${kanji.char}" title="Listen Kanji">${UI_ICONS.volume}</button>
        </div>
        <div class="modal-kanji-info">
          <div class="modal-badges-row">
            ${renderLevelPills(kanji.levels)}
            ${kanji.strokes ? `<span class="stroke-badge">${kanji.strokes} strokes</span>` : ''}
            ${kanji.radical ? `<span class="radical-badge">Radical: ${kanji.radical}</span>` : ''}
          </div>
          <h2 class="modal-kanji-meaning">${kanji.meaning}</h2>
          ${sourceInfo ? `
            <div class="modal-source-info">
              ${UI_ICONS.book} <strong>${sourceInfo.book}</strong> &mdash; ${sourceInfo.chapter || ''} ${sourceInfo.notes ? `(${sourceInfo.notes})` : ''}
            </div>
          ` : ''}
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
          <span>Target Vocabulary & Compounds (熟語)</span>
          <span class="count-chip">${kanji.examples ? kanji.examples.length : 0} Words</span>
        </div>
        
        <div class="modal-examples-list">
          ${(kanji.examples || []).map(ex => `
            <div class="modal-example-row">
              <div class="example-jp-col">
                <span class="example-word">${ex.word}</span>
                <span class="example-reading">【${ex.reading}】</span>
                <button class="mini-audio-btn" data-speak="${ex.word}" title="Listen">${UI_ICONS.volume}</button>
              </div>
              <div class="example-en-col">${ex.meaning}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-footer-actions">
        <button class="btn-secondary" data-bookmark-id="${kanji.id}">
          ${isBookmarked ? `${UI_ICONS.starFilled} Bookmarked` : `${UI_ICONS.starOutline} Add to Bookmarks`}
        </button>
      </div>
    `;

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
    if (!list) return;

    const items = filterItems(window.JLPT_DATA.vocabulary, ['word', 'reading', 'romaji', 'meaning']);

    if (countTag) countTag.textContent = `${items.length} Words`;

    if (items.length === 0) {
      list.innerHTML = `<div class="empty-state card-glass"><p>No vocabulary words found.</p></div>`;
      return;
    }

    list.innerHTML = items.map(v => {
      const isBookmarked = state.bookmarks.has(v.id);
      return `
        <div class="vocab-card card-glass">
          <div class="vocab-top">
            <div class="vocab-badges">${renderLevelPills(v.levels || [v.level])}</div>
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

          <div class="vocab-romaji">${v.romaji}</div>
          <div class="vocab-meaning">${v.meaning}</div>

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
    if (!list) return;

    const items = filterItems(window.JLPT_DATA.grammar, ['pattern', 'meaning', 'explanation', 'structure']);

    if (countTag) countTag.textContent = `${items.length} Grammar Points`;

    if (items.length === 0) {
      list.innerHTML = `<div class="empty-state card-glass"><p>No grammar points found.</p></div>`;
      return;
    }

    list.innerHTML = items.map(g => {
      const isBookmarked = state.bookmarks.has(g.id);
      return `
        <div class="grammar-card card-glass">
          <div class="grammar-header">
            <div class="grammar-badges">${renderLevelPills(g.levels || [g.level])}</div>
            <div class="grammar-actions">
              <button class="action-btn" data-speak="${g.pattern}" title="Listen">${UI_ICONS.volume}</button>
              <button class="action-btn" data-bookmark-id="${g.id}" title="Bookmark">
                ${isBookmarked ? UI_ICONS.starFilled : UI_ICONS.starOutline}
              </button>
            </div>
          </div>

          <div class="grammar-pattern-row">
            <h3 class="grammar-pattern">${g.pattern}</h3>
            <span class="grammar-meaning">${g.meaning}</span>
          </div>

          ${g.structure ? `<div class="grammar-structure"><strong>Formation:</strong> ${g.structure}</div>` : ''}
          <div class="grammar-explanation">${g.explanation}</div>

          ${Array.isArray(g.examples) && g.examples.length > 0 ? `
            <div class="grammar-examples-box">
              <div class="ex-title">Example Sentences:</div>
              ${g.examples.map(ex => `
                <div class="grammar-ex-item">
                  <div class="ex-ja-row">
                    <span class="ex-ja">${parseFurigana(ex.furigana)}</span>
                    <button class="mini-audio-btn" data-speak="${ex.ja}" title="Listen">${UI_ICONS.volume}</button>
                  </div>
                  <div class="ex-en">${ex.en}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${renderSourcesHtml(g.sources)}
        </div>
      `;
    }).join('');
  }

  // --- 4. FLASHCARDS DECK ---
  function buildFlashcardDeck() {
    let pool = [];
    const cat = state.flashcards.category;

    if (cat === 'kanji') {
      pool = window.JLPT_DATA.kanji;
    } else if (cat === 'vocab') {
      pool = window.JLPT_DATA.vocabulary;
    } else if (cat === 'grammar') {
      pool = window.JLPT_DATA.grammar;
    }

    if (state.selectedLevel !== 'ALL') {
      pool = pool.filter(item => {
        const itemLevels = item.levels || (item.level ? [item.level] : ['N5']);
        return itemLevels.includes(state.selectedLevel);
      });
    }

    state.flashcards.deck = [...pool];
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
    const count = deck.length;

    if (count === 0) {
      if (indexEl) indexEl.textContent = '0';
      if (totalEl) totalEl.textContent = '0';
      if (progressFill) progressFill.style.width = '0%';
      cardEl.classList.remove('flipped');
      cardEl.querySelector('.fc-front').innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <p>No cards in this deck for the selected level.</p>
        </div>
      `;
      return;
    }

    const current = deck[state.flashcards.currentIndex];
    if (!current) return;

    if (indexEl) indexEl.textContent = state.flashcards.currentIndex + 1;
    if (totalEl) totalEl.textContent = count;
    if (progressFill) progressFill.style.width = `${((state.flashcards.currentIndex + 1) / count) * 100}%`;

    cardEl.classList.toggle('flipped', state.flashcards.isFlipped);

    const frontEl = cardEl.querySelector('.fc-front');
    const backEl = cardEl.querySelector('.fc-back');

    if (state.flashcards.category === 'kanji') {
      frontEl.innerHTML = `
        <div class="fc-badge-top">${renderLevelPills(current.levels)}</div>
        <div class="fc-big-text">${current.char}</div>
        <div class="fc-prompt">Click or press Space to reveal readings & meaning</div>
      `;
      backEl.innerHTML = `
        <div class="fc-badge-top">${renderLevelPills(current.levels)}</div>
        <div class="fc-back-title">${current.char}</div>
        <div class="fc-back-meaning">${current.meaning}</div>
        <div class="fc-back-readings">
          ${current.onyomi ? `<div><span class="fc-lbl">ON:</span> ${current.onyomi}</div>` : ''}
          ${current.kunyomi ? `<div><span class="fc-lbl">KUN:</span> ${current.kunyomi}</div>` : ''}
        </div>
        ${current.examples && current.examples[0] ? `
          <div class="fc-back-sample">
            <strong>Sample Word:</strong> ${current.examples[0].word} (${current.examples[0].reading}) &mdash; ${current.examples[0].meaning}
          </div>
        ` : ''}
      `;
    } else if (state.flashcards.category === 'vocab') {
      frontEl.innerHTML = `
        <div class="fc-badge-top">${renderLevelPills(current.levels || [current.level])}</div>
        <div class="fc-big-text">${current.word}</div>
        <div class="fc-prompt">Click to reveal reading & English definition</div>
      `;
      backEl.innerHTML = `
        <div class="fc-badge-top">${renderLevelPills(current.levels || [current.level])}</div>
        <div class="fc-back-title">${current.word}</div>
        <div class="fc-back-reading">【${current.reading}】</div>
        <div class="fc-back-meaning">${current.meaning}</div>
        ${current.example ? `
          <div class="fc-back-sample">${parseFurigana(current.example.furigana)}<br><small>${current.example.en}</small></div>
        ` : ''}
      `;
    } else {
      frontEl.innerHTML = `
        <div class="fc-badge-top">${renderLevelPills(current.levels || [current.level])}</div>
        <div class="fc-big-text sm">${current.pattern}</div>
        <div class="fc-prompt">Click to reveal meaning & explanation</div>
      `;
      backEl.innerHTML = `
        <div class="fc-badge-top">${renderLevelPills(current.levels || [current.level])}</div>
        <div class="fc-back-title sm">${current.pattern}</div>
        <div class="fc-back-meaning">${current.meaning}</div>
        <div class="fc-back-explanation">${current.explanation}</div>
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
    const deck = state.flashcards.deck;
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    state.flashcards.currentIndex = 0;
    state.flashcards.isFlipped = false;
    renderFlashcard();
  }

  // --- 5. KANA TABLES ---
  function renderKana() {
    const hGrid = document.getElementById('hiragana-grid');
    const kGrid = document.getElementById('katakana-grid');
    if (!hGrid || !kGrid || !window.KANA_DATA) return;

    hGrid.innerHTML = window.KANA_DATA.hiragana.map(k => `
      <div class="kana-cell ${k.empty ? 'empty' : ''}" ${k.char ? `data-speak="${k.char}" title="Click to hear ${k.romaji}"` : ''}>
        ${k.char ? `
          <div class="kana-char">${k.char}</div>
          <div class="kana-romaji">${k.romaji}</div>
        ` : ''}
      </div>
    `).join('');

    kGrid.innerHTML = window.KANA_DATA.katakana.map(k => `
      <div class="kana-cell ${k.empty ? 'empty' : ''}" ${k.char ? `data-speak="${k.char}" title="Click to hear ${k.romaji}"` : ''}>
        ${k.char ? `
          <div class="kana-char">${k.char}</div>
          <div class="kana-romaji">${k.romaji}</div>
        ` : ''}
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
    renderAll();
  }

  function renderBookmarks() {
    const list = document.getElementById('bookmarks-list');
    const countTag = document.getElementById('bookmark-count');
    if (!list) return;

    const allItems = [
      ...window.JLPT_DATA.kanji,
      ...window.JLPT_DATA.vocabulary,
      ...window.JLPT_DATA.grammar
    ];

    const saved = allItems.filter(item => state.bookmarks.has(item.id));
    if (countTag) countTag.textContent = `${saved.length} Saved Items`;

    if (saved.length === 0) {
      list.innerHTML = `
        <div class="empty-state card-glass">
          <p>No bookmarked items yet. Click the star icon on any Kanji, word, or grammar rule to save it here!</p>
        </div>
      `;
      return;
    }

    list.innerHTML = saved.map(item => {
      const isKanji = !!item.char;
      const isVocab = !!item.word;
      const isGrammar = !!item.pattern;

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
      buildFlashcardDeck();
      renderAll();
    },
    resetFilters: () => {
      state.selectedLevel = 'ALL';
      state.selectedWeek = 'ALL';
      state.searchQuery = '';
      const s = document.getElementById('global-search-input');
      if (s) s.value = '';
      document.querySelectorAll('.level-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-level') === 'ALL'));
      document.querySelectorAll('.week-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-week') === 'ALL'));
      renderAll();
    },
    switchTab: switchTab,
    openKanjiModal: openKanjiModal,
    speakJapanese: speakJapanese,
    toggleBookmark: toggleBookmark
  };

})();

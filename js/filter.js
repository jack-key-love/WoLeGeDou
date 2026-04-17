(function () {
  var FAVORITE_KEY = 'wld-gallery-favorites';

  /**
   * Get the current active filter button value.
   * @param {HTMLElement} group Filter button group.
   * @returns {string} Active value.
   */
  function getActiveValue(group) {
    var active = group.querySelector('.filter-button.is-active');
    return active ? active.dataset.value : 'all';
  }

  /**
   * Read saved favorites from localStorage.
   * @returns {string[]} Favorite card ids.
   */
  function readFavorites() {
    try {
      var raw = window.localStorage.getItem(FAVORITE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Save favorite ids to localStorage.
   * @param {string[]} ids Favorite ids.
   * @returns {void}
   */
  function writeFavorites(ids) {
    window.localStorage.setItem(FAVORITE_KEY, JSON.stringify(ids));
  }

  /**
   * Toggle gallery card visibility according to active filters.
   * @param {HTMLElement[]} cards Gallery cards.
   * @param {{difficulty: string, theme: string}} state Filter state.
   * @param {HTMLElement|null} emptyState Empty state element.
   * @returns {void}
   */
  function updateCards(cards, state, emptyState) {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var difficulty = card.dataset.difficulty;
      var theme = card.dataset.theme;
      var matchDifficulty = state.difficulty === 'all' || difficulty === state.difficulty;
      var matchTheme = state.theme === 'all' || theme === state.theme;
      var isVisible = matchDifficulty && matchTheme;
      card.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.classList.toggle('show', visibleCount === 0);
    }
  }

  /**
   * Sync favorite button classes from saved ids.
   * @param {HTMLElement[]} cards Gallery cards.
   * @param {string[]} favoriteIds Saved favorite ids.
   * @returns {void}
   */
  function syncFavorites(cards, favoriteIds) {
    cards.forEach(function (card) {
      var button = card.querySelector('[data-favorite-button]');
      if (!button) return;
      var isFaved = favoriteIds.indexOf(card.dataset.cardId) !== -1;
      button.classList.toggle('is-faved', isFaved);
      button.setAttribute('aria-pressed', String(isFaved));
    });
  }

  /**
   * Open the gallery preview modal with current card content.
   * @param {HTMLElement} modal Preview modal element.
   * @param {HTMLElement} card Gallery card element.
   * @returns {void}
   */
  function openPreview(modal, card) {
    var sourceImage = card.querySelector('.gallery-thumb img');
    var title = card.querySelector('.gallery-body h3');
    var chips = Array.prototype.slice.call(card.querySelectorAll('.data-chip'));
    var previewImage = modal.querySelector('[data-preview-image]');
    var previewTitle = modal.querySelector('[data-preview-title]');
    var previewMeta = modal.querySelector('[data-preview-meta]');

    if (!sourceImage || !previewImage || !previewTitle || !previewMeta) return;

    previewImage.src = sourceImage.getAttribute('src') || '';
    previewImage.alt = sourceImage.getAttribute('alt') || '';
    previewTitle.textContent = title ? title.textContent : '图案预览';
    previewMeta.textContent = chips.map(function (chip) {
      return chip.textContent;
    }).join(' / ');
    modal.classList.add('is-visible');
  }

  /**
   * Close the gallery preview modal.
   * @param {HTMLElement} modal Preview modal element.
   * @returns {void}
   */
  function closePreview(modal) {
    modal.classList.remove('is-visible');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var gallery = document.querySelector('[data-gallery-grid]');
    if (!gallery) return;

    var cards = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-card'));
    var difficultyGroup = document.querySelector('[data-filter-group="difficulty"]');
    var themeGroup = document.querySelector('[data-filter-group="theme"]');
    var emptyState = document.querySelector('[data-filter-empty]');
    var previewModal = document.querySelector('[data-preview-modal]');
    var previewClose = document.querySelector('[data-preview-close]');
    var state = { difficulty: 'all', theme: 'all' };
    var favoriteIds = readFavorites();

    function activate(group, button) {
      group.querySelectorAll('.filter-button').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
    }

    function syncFilters() {
      state.difficulty = difficultyGroup ? getActiveValue(difficultyGroup) : 'all';
      state.theme = themeGroup ? getActiveValue(themeGroup) : 'all';
      updateCards(cards, state, emptyState);
    }

    [difficultyGroup, themeGroup].forEach(function (group) {
      if (!group) return;
      group.addEventListener('click', function (event) {
        var button = event.target.closest('.filter-button');
        if (!button) return;
        activate(group, button);
        syncFilters();
      });
    });

    gallery.addEventListener('click', function (event) {
      var previewButton = event.target.closest('[data-preview-open]');
      if (previewButton) {
        var previewCard = previewButton.closest('.gallery-card');
        if (previewModal && previewCard) {
          openPreview(previewModal, previewCard);
        }
        return;
      }

      var button = event.target.closest('[data-favorite-button]');
      if (!button) return;

      var card = button.closest('.gallery-card');
      if (!card) return;

      var cardId = card.dataset.cardId;
      var index = favoriteIds.indexOf(cardId);

      if (index === -1) {
        favoriteIds.push(cardId);
      } else {
        favoriteIds.splice(index, 1);
      }

      writeFavorites(favoriteIds);
      syncFavorites(cards, favoriteIds);
    });

    if (previewClose && previewModal) {
      previewClose.addEventListener('click', function () {
        closePreview(previewModal);
      });
    }

    if (previewModal) {
      previewModal.addEventListener('click', function (event) {
        if (event.target === previewModal) {
          closePreview(previewModal);
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && previewModal.classList.contains('is-visible')) {
          closePreview(previewModal);
        }
      });
    }

    syncFavorites(cards, favoriteIds);
    syncFilters();
  });
})();

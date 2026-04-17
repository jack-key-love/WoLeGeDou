(function () {
  var CHECK_KEY = 'wld-tutorial-checks';

  /**
   * Read saved step completion states.
   * @returns {Object.<string, boolean>} Completion map.
   */
  function readChecks() {
    try {
      var raw = window.localStorage.getItem(CHECK_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  /**
   * Save step completion states.
   * @param {Object.<string, boolean>} checks Completion map.
   * @returns {void}
   */
  function writeChecks(checks) {
    window.localStorage.setItem(CHECK_KEY, JSON.stringify(checks));
  }

  /**
   * Toggle accordion open state.
   * @param {HTMLElement} item Accordion item.
   * @returns {void}
   */
  function toggleItem(item) {
    var panel = item.querySelector('.accordion-panel');
    var trigger = item.querySelector('.accordion-trigger');
    var symbol = item.querySelector('[data-accordion-symbol]');
    var isOpen = item.classList.contains('is-open');

    item.classList.toggle('is-open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    if (symbol) {
      symbol.textContent = isOpen ? '+' : '−';
    }

    if (!isOpen) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = '0px';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.accordion-item');
    if (!items.length) return;

    var checks = readChecks();

    items.forEach(function (item, index) {
      var trigger = item.querySelector('.accordion-trigger');
      var panel = item.querySelector('.accordion-panel');
      var checkbox = item.querySelector('[data-step-check]');
      var itemId = item.dataset.stepId;
      var complete = Boolean(checks[itemId]);

      item.classList.toggle('is-complete', complete);
      if (checkbox) {
        checkbox.classList.toggle('is-checked', complete);
        checkbox.setAttribute('aria-pressed', String(complete));
      }

      if (index === 0) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        var symbol = item.querySelector('[data-accordion-symbol]');
        if (symbol) {
          symbol.textContent = '−';
        }
      }

      if (checkbox) {
        checkbox.addEventListener('click', function (event) {
          event.stopPropagation();
          var nextState = !item.classList.contains('is-complete');
          item.classList.toggle('is-complete', nextState);
          checkbox.classList.toggle('is-checked', nextState);
          checkbox.setAttribute('aria-pressed', String(nextState));
          checks[itemId] = nextState;
          writeChecks(checks);
        });
      }

      trigger.addEventListener('click', function () {
        toggleItem(item);
      });
    });
  });
})();

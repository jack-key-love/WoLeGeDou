(function () {
  var THEME_KEY = 'wld-theme';

  /**
   * Apply the selected theme to the document root.
   * @param {string} theme Theme name.
   * @returns {void}
   */
  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }

  /**
   * Restore theme preference from localStorage.
   * @returns {void}
   */
  function restoreTheme() {
    var savedTheme = window.localStorage.getItem(THEME_KEY);
    applyTheme(savedTheme || 'light');
  }

  /**
   * Highlight current nav item from the body dataset.
   * @returns {void}
   */
  function setActiveNav() {
    var page = document.body.dataset.page;
    if (!page) return;

    document.querySelectorAll('[data-nav]').forEach(function (link) {
      if (link.dataset.nav === page) {
        link.classList.add('is-active');
      }
    });
  }

  /**
   * Reveal observed elements on scroll.
   * @returns {void}
   */
  function createObserver() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (element) {
        element.classList.add('in-view');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /**
   * Animate page exit before navigation.
   * @returns {void}
   */
  function handlePageTransition() {
    window.requestAnimationFrame(function () {
      document.body.classList.add('page-ready');
    });

    document.querySelectorAll('a[data-transition]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var href = link.getAttribute('href');
        var isHash = href && href.charAt(0) === '#';
        var isNewTab = link.target === '_blank';

        if (!href || isHash || isNewTab || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();
        document.body.classList.add('page-leaving');
        window.setTimeout(function () {
          window.location.href = href;
        }, 240);
      });
    });
  }

  /**
   * Bind back-to-top button.
   * @returns {void}
   */
  function bindBackToTop() {
    var trigger = document.querySelector('[data-back-top]');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Toggle theme and persist selection.
   * @returns {void}
   */
  function bindThemeToggle() {
    var button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    button.addEventListener('click', function () {
      var currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      window.localStorage.setItem(THEME_KEY, nextTheme);
    });
  }

  /**
   * Update the header progress bar width according to scroll position.
   * @returns {void}
   */
  function bindScrollProgress() {
    var bar = document.querySelector('[data-scroll-bar]');
    if (!bar) return;

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * Bind responsive mobile navigation behaviour.
   * @returns {void}
   */
  function bindMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    function closeNav() {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var willOpen = !document.body.classList.contains('nav-open');
      document.body.classList.toggle('nav-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeNav();
      }
    });

    document.addEventListener('click', function (event) {
      if (!document.body.classList.contains('nav-open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeNav();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeNav();
      }
    });
  }

  /**
   * Fade images in after loading for skeleton placeholders.
   * @returns {void}
   */
  function bindImageSkeletons() {
    document.querySelectorAll('.img-skeleton img').forEach(function (image) {
      function markLoaded() {
        var wrapper = image.closest('.img-skeleton');
        if (wrapper) {
          wrapper.classList.add('is-loaded');
        }
      }

      if (image.complete) {
        markLoaded();
      } else {
        image.addEventListener('load', markLoaded, { once: true });
        image.addEventListener('error', markLoaded, { once: true });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    restoreTheme();
    setActiveNav();
    createObserver();
    handlePageTransition();
    bindBackToTop();
    bindThemeToggle();
    bindScrollProgress();
    bindMobileNav();
    bindImageSkeletons();
  });
})();

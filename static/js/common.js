'use strict';

(function () {
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    if (scrollTo == null) {
      return;
    }

    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }

  function copyText(text) {
    if (navigator.clipboard != null) {
      return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
  }

  function initArrowUp(options = {}) {
    const arrowUp = document.querySelector(options.selector || '.arrow-up');
    if (arrowUp == null || arrowUp.dataset.arrowUpInitialized === 'true') {
      return;
    }

    const triggerOffset = options.triggerOffset || window.innerHeight / 2;
    const targetSelector = options.targetSelector || '#home';
    arrowUp.dataset.arrowUpInitialized = 'true';

    document.addEventListener('scroll', () => {
      if (window.scrollY > triggerOffset) {
        arrowUp.classList.add('visible');
      } else {
        arrowUp.classList.remove('visible');
      }
    });

    arrowUp.addEventListener('click', () => {
      if (document.querySelector(targetSelector) != null) {
        scrollIntoView(targetSelector);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  window.PortfolioCommon = {
    copyText,
    initArrowUp,
    scrollIntoView,
  };
})();

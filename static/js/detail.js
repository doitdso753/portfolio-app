'use strict';

(function () {
  const common = window.PortfolioCommon;
  const detailItems = document.querySelectorAll('[data-detail-item]');

  document.body.classList.add('detail-ready');

  if (common != null) {
    common.initArrowUp({
      targetSelector: '#detail-panel',
      triggerOffset: 240,
    });
  }

  if (!('IntersectionObserver' in window) || detailItems.length === 0) {
    detailItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  detailItems.forEach((item) => {
    observer.observe(item);
  });
})();

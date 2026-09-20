'use strict';

(function () {
  const common = window.PortfolioCommon;

  document.querySelectorAll('.case-back').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!('BroadcastChannel' in window)) return;

      event.preventDefault();
      const channel = new BroadcastChannel('portfolio-home');
      const requestId = `${Date.now()}-${Math.random()}`;
      const goToList = () => {
        channel.close();
        window.location.assign(link.href);
      };
      const timeout = window.setTimeout(goToList, 500);

      channel.addEventListener('message', (message) => {
        if (message.data?.type !== 'home-open' || message.data.requestId !== requestId) return;
        window.clearTimeout(timeout);
        channel.close();
        window.close();
        // Directly opened tabs may not be closable by script.
        window.setTimeout(() => window.location.assign(link.href), 150);
      });
      channel.postMessage({ type: 'find-home', requestId });
    });
  });
  const detailItems = document.querySelectorAll('[data-detail-item]');
  const sectionLinks = Array.from(document.querySelectorAll('.case-nav a[href^="#"]'));
  const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href')));
  const navToggle = document.querySelector('.case-nav__toggle');
  const navList = document.querySelector('.case-nav__list');

  if (navToggle != null && navList != null) {
    const setNavOpen = (isOpen) => {
      navList.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '목차 닫기' : '목차 열기');
    };

    navToggle.addEventListener('click', () => {
      setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    sectionLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 768px)').matches) setNavOpen(false);
      });
    });
  }

  if (sectionLinks.length > 0 && sections.every(Boolean)) {
    const updateCurrentSection = () => {
      let currentIndex = -1;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= 120) currentIndex = index;
      });
      sectionLinks.forEach((link, index) => {
        if (index === currentIndex) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    let scheduled = false;
    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        updateCurrentSection();
        scheduled = false;
      });
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    updateCurrentSection();
  }

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

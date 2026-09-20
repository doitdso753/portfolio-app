'use strict';

const common = window.PortfolioCommon;

// Let detail tabs check whether the project list is still open.
if ('BroadcastChannel' in window) {
  const homeChannel = new BroadcastChannel('portfolio-home');
  homeChannel.addEventListener('message', (event) => {
    if (event.data?.type === 'find-home') {
      homeChannel.postMessage({ type: 'home-open', requestId: event.data.requestId });
    }
  });
}

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  common.scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle navigation from the home action links
document.querySelectorAll('.home__button[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    common.scrollIntoView(link.getAttribute('href'));
  });
});

// Home height determines when the back-to-top button appears
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

// Skills collapse interaction
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item) => {
  const header = item.querySelector('.skill-item__header');
  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    skillItems.forEach((skillItem) => {
      skillItem.classList.remove('open');
      skillItem.querySelector('.skill-item__header').setAttribute('aria-expanded', 'false');
      skillItem.querySelector('.skill-item__content').hidden = true;
    });

    if (!isOpen) {
      item.classList.add('open');
      header.setAttribute('aria-expanded', 'true');
      item.querySelector('.skill-item__content').hidden = false;
    }
  });
});

common.initArrowUp({
  targetSelector: '#home',
  triggerOffset: homeHeight / 2,
});

// 이메일 클립 복사
const copyEmailBtn = document.querySelector('.contact__link--copy');
if (copyEmailBtn != null) {
  copyEmailBtn.addEventListener('click', () => {
    common.copyText(copyEmailBtn.dataset.copy).then(() => {
      alert('복사 완료되었습니다.')
    });
  });
}

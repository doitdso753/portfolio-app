'use strict';

const common = window.PortfolioCommon;

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

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  common.scrollIntoView('#about');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Skills collapse interaction
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item) => {
  const header = item.querySelector('.skill-item__header');
  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    skillItems.forEach((skillItem) => {
      skillItem.classList.remove('open');
      skillItem.querySelector('.skill-item__header').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});

common.initArrowUp({
  targetSelector: '#home',
  triggerOffset: homeHeight / 2,
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project-panel');
workBtnContainer.addEventListener('click', (e) => {
  const selectedBtn = e.target.closest('.category__btn');
  if (selectedBtn == null) {
    return;
  }
  const filter = selectedBtn.dataset.filter;

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  if (active != null) {
    active.classList.remove('selected');
  }
  selectedBtn.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
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

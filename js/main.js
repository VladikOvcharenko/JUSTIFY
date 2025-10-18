document.addEventListener('DOMContentLoaded', () => {
  // header
  const header = document.querySelector('.header');

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 30) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }

    if (currentScrollY > 200) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  // header

  // burger
  const burgerBtn = document.querySelector('.burger');
  const navMenu = document.querySelector('.header-menu');
  const headerLogo = document.querySelector('.header-logo');
  const body = document.querySelector('.page-body');
  const menuLinks = document.querySelectorAll('.header-nav a');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger--active');
    navMenu.classList.toggle('header-menu--active');
    headerLogo.classList.toggle('header-logo--active');
    body.classList.toggle('dis-scroll');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('burger--active');
      navMenu.classList.remove('header-menu--active');
      headerLogo.classList.remove('header-logo--active');
      body.classList.remove('dis-scroll');
    });
  });
  // burger

  // specialization-nav

  const navItems = document.querySelectorAll('.specialization-nav__item');
  const navLinks = document.querySelectorAll('a[href="#specialization"]');
  const lists = document.querySelectorAll('.specialization-list');
  const content = document.querySelector('.specialization-content');

  const activeList = document.querySelector('.specialization-list.active');

  if (activeList && content) {
    content.style.height = activeList.scrollHeight - 80 + 'px';
  }

  function activateTab(index) {
    navItems.forEach((i) => i.classList.remove('active'));
    if (navItems[index]) {
      navItems[index].classList.add('active');
    }

    const current = document.querySelector('.specialization-list.active');
    const next = lists[index];

    if (current) {
      current.classList.remove('active');
    }

    if (next) {
      next.classList.add('active');

      if (content) {
        const newHeight = next.scrollHeight + 'px';
        content.style.height = newHeight;
      }
    }
  }

  navItems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      activateTab(index);
    });
  });

  navLinks.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('data-fiz')) {
        activateTab(0);
      } else if (btn.hasAttribute('data-biz')) {
        activateTab(1);
      }
    });
  });

  // specialization-nav
});

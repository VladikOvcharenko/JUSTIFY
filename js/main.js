document.addEventListener('DOMContentLoaded', () => {
  // header
  const header = document.querySelector('.header');

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;

    // Скрытие/показ хедера
    if (currentScrollY > lastScrollY && currentScrollY > 30) {
      // Скролл вниз
      header.classList.add('header--hidden');
    } else {
      // Скролл вверх
      header.classList.remove('header--hidden');
    }

    // Добавление фона при 200px+
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
      body.classList.remove('dis-scroll');
    });
  });
  // burger

  // specialization-nav

  const navItems = document.querySelectorAll('.specialization-nav__item');
  const lists = document.querySelectorAll('.specialization-list');
  const content = document.querySelector('.specialization-content');

  const activeList = document.querySelector('.specialization-list.active');

  content.style.height = activeList.scrollHeight - 80 + 'px';

  navItems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      navItems.forEach((i) => i.classList.remove('active'));
      btn.classList.add('active');

      const current = document.querySelector('.specialization-list.active');
      const next = lists[index];

      current.classList.remove('active');
      next.classList.add('active');

      const newHeight = next.scrollHeight + 'px';
      content.style.height = newHeight;
    });
  });

  // specialization-nav
});

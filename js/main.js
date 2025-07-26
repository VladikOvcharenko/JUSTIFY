document.addEventListener('DOMContentLoaded', () => {
  // AOS
  AOS.init();
  // AOS

  // header
  const header = document.querySelector('.header');

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;

    // Скрытие/показ хедера
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
      navMenu.classList.remove('header-nav--active');
      body.classList.remove('dis-scroll');
    });
  });
  // burger
});

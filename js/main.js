document.addEventListener('DOMContentLoaded', () => {
  // AOS
  AOS.init();
  // AOS

  // burger
  const burgerBtn = document.querySelector('.burger');
  const navMenu = document.querySelector('.header-nav');
  const body = document.querySelector('.page-body');
  const menuLinks = document.querySelectorAll('.header-nav a');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger--active');
    navMenu.classList.toggle('header-nav--active');
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

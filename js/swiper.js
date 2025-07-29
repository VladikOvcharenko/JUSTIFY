const swiper = new Swiper('.reviews-slider', {
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: '.reviews-nav__btn--next',
    prevEl: '.reviews-nav__btn--prev',
  },
  pagination: {
    el: '.reviews-nav__pagination',
    // clickable: true,
    renderBullet: function (index, className) {
      const labels = [
        'Надія, директор Товариства',
        'Таісія, директор Товариства',
        'Владислав',
        'Віктор',
        'Дмитро',
      ];
      return `<div class="${className} reviews-nav__item">${labels[index]}</div>`;
    },
  },
});

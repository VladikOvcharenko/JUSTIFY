const swiper = new Swiper('.reviews-slider', {
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: '.reviews-nav__btn--next',
    prevEl: '.reviews-nav__btn--prev',
  },
  pagination: {
    clickable: true,
    el: '.reviews-nav__pagination',
    // clickable: true,
    renderBullet: function (index, className) {
      const labels = [
        'Надія, директор Товариства',
        'Таісія, повернення майна',
        'Владислав, захист при кримінальному провадженні',
        'Віктор, захист у суді',
        'Дмитро, захист при слідчих діях',
      ];
      return `<div class="${className} reviews-nav__item">${labels[index]}</div>`;
    },
  },
});

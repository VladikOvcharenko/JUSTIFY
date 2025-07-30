document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animation]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const animationType = el.dataset.animation;
        const delay = el.dataset.delay || '0s';
        const duration = el.dataset.duration || '0.6s';

        if (entry.isIntersecting) {
          el.style.transitionDelay = delay;
          el.style.transitionDuration = duration;
          el.classList.add(animationType, 'visible');
        } else {
          el.classList.remove('visible');
          el.style.transitionDelay = '0s';
          el.style.transitionDuration = '0.6s';
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  // ❗️Отложенный запуск observer (чтобы начальные стили успели примениться)
  setTimeout(() => {
    animatedElements.forEach((el) => observer.observe(el));
  }, 50); // 50–100 мс достаточно
});

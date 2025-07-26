document.addEventListener('DOMContentLoaded', () => {
  AOS.init();

  // анимация секции PROBLEMS

  // анимация секции PROBLEMS

  // анимация саекции system

  // анимация саекции system

  // событие на появление секции solutions, изменение бг
  const sectionSolutions = document.querySelector('.solutions');
  const backgroundSolutions = sectionSolutions.querySelector('.solutions-bg');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          backgroundSolutions.classList.add('visible');
        } else {
          backgroundSolutions.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(sectionSolutions);
  // событие на появление секции solutions, изменение бг
});

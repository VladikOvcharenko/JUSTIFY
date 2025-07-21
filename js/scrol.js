document.addEventListener('DOMContentLoaded', () => {
  // анимация секции PROBLEMS
  const sectionProblems = document.querySelector('.problems');
  const list = sectionProblems.querySelector('.problems-info__list');
  const items = Array.from(
    sectionProblems.querySelectorAll('.problems-info__item')
  );

  const itemHeight = items[0].offsetHeight;
  const screenHeight = window.innerHeight;
  const scrollRange = screenHeight * (items.length - 1);
  let currentIndex = 0;

  setActive(0);

  window.addEventListener('scroll', () => {
    const sectionTop = sectionProblems.offsetTop;
    const scrollY = window.scrollY;
    const relativeScroll = scrollY - sectionTop;

    if (relativeScroll >= 0 && relativeScroll <= scrollRange) {
      sectionProblems.classList.add('sticky');
      sectionProblems.classList.remove('sticky-end');

      const newIndex = Math.round(relativeScroll / screenHeight);
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        setActive(currentIndex);
      }

      list.style.transform = `translateY(${-itemHeight * currentIndex}px)`;
    } else if (relativeScroll > scrollRange) {
      sectionProblems.classList.remove('sticky');
      sectionProblems.classList.add('sticky-end');
      list.style.transform = `translateY(${
        -itemHeight * (items.length - 1)
      }px)`;
      setActive(items.length - 1);
    } else {
      sectionProblems.classList.remove('sticky', 'sticky-end');
      list.style.transform = `translateY(0px)`;
      setActive(0);
    }
  });

  function setActive(index) {
    items.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
  }
  // анимация секции PROBLEMS

  // анимация саекции system

  const sectionSystem = document.querySelector('.system');
  const textItems = document.querySelectorAll('.system-step');

  window.addEventListener('scroll', () => {
    const containerRect = sectionSystem.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;

    // Определяем, в какой части контейнера находится пользователь
    const scrollProgress =
      -containerTop / (containerHeight - window.innerHeight);

    // Делим прокрутку на этапы для каждого текста
    const step = 1 / textItems.length;

    textItems.forEach((item, index) => {
      const start = index * step;
      const end = (index + 1) * step;

      // Показываем текст, если прокрутка находится в нужном диапазоне
      if (scrollProgress >= start && scrollProgress < end) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
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

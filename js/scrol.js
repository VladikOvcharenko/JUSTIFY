document.addEventListener('DOMContentLoaded', () => {
  AOS.init();

  function setVhUnit() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setVhUnit);
  window.addEventListener('orientationchange', setVhUnit);
  setVhUnit(); // Первый вызов

  // анимация секции PROBLEMS

  // const sectionProblems = document.querySelector('.problems');
  // const list = sectionProblems.querySelector('.problems-info__list');
  // const items = Array.from(
  //   sectionProblems.querySelectorAll('.problems-info__item')
  // );

  // const itemHeight = items[0].offsetHeight;
  // const screenHeight = window.innerHeight;

  // // 👇 Шаг скролла для перехода к следующему элементу
  // const scrollStep = screenHeight * 0.8;

  // // 👇 Полный диапазон скролла — как в оригинале
  // const scrollRange = screenHeight * (items.length - 1);

  // // 👇 Задаём высоту секции вручную, чтобы избежать рывков
  // sectionProblems.style.height = `${screenHeight * items.length - 600}px`;

  // let currentIndex = 0;

  // setActive(0);

  // window.addEventListener('scroll', () => {
  //   const sectionTop = sectionProblems.offsetTop;
  //   const scrollY = window.scrollY;
  //   const relativeScroll = scrollY - sectionTop;

  //   if (relativeScroll >= 0 && relativeScroll <= scrollRange) {
  //     sectionProblems.classList.add('sticky');
  //     sectionProblems.classList.remove('sticky-end');

  //     // 👇 Используем scrollStep для переключения активного элемента
  //     const newIndex = Math.round(relativeScroll / scrollStep);
  //     if (newIndex !== currentIndex && newIndex < items.length) {
  //       currentIndex = newIndex;
  //       setActive(currentIndex);
  //     }

  //     list.style.transform = `translateY(${-itemHeight * currentIndex}px)`;
  //   } else if (relativeScroll > scrollRange) {
  //     sectionProblems.classList.remove('sticky');
  //     sectionProblems.classList.add('sticky-end');
  //     list.style.transform = `translateY(${
  //       -itemHeight * (items.length - 1)
  //     }px)`;
  //     setActive(items.length - 1);
  //   } else {
  //     sectionProblems.classList.remove('sticky', 'sticky-end');
  //     list.style.transform = `translateY(0px)`;
  //     setActive(0);
  //   }
  // });

  // function setActive(index) {
  //   items.forEach((el, i) => {
  //     el.classList.toggle('active', i === index);
  //   });
  // }

  const sectionProblems = document.querySelector('.problems');
  const list = sectionProblems.querySelector('.problems-info__list');
  const items = Array.from(
    sectionProblems.querySelectorAll('.problems-info__item')
  );

  let itemHeight = items[0].offsetHeight;
  let screenHeight = window.innerHeight;
  let scrollStep = screenHeight * 0.8;
  let scrollRange = screenHeight * (items.length - 1);

  sectionProblems.style.height = `${screenHeight * items.length - 600}px`;

  let currentIndex = 0;
  setActive(0);

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', recalculateSizes);

  function handleScroll() {
    const sectionTop = sectionProblems.offsetTop;
    const scrollY = window.scrollY;
    const relativeScroll = scrollY - sectionTop;

    if (relativeScroll >= 0 && relativeScroll <= scrollRange) {
      sectionProblems.classList.add('sticky');
      sectionProblems.classList.remove('sticky-end');

      const newIndex = Math.round(relativeScroll / scrollStep);
      if (newIndex !== currentIndex && newIndex < items.length) {
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
  }

  function setActive(index) {
    items.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
  }

  function recalculateSizes() {
    itemHeight = items[0].offsetHeight;
    screenHeight = window.innerHeight;
    scrollStep = screenHeight * 0.8;
    scrollRange = screenHeight * (items.length - 1);

    sectionProblems.style.height = `${screenHeight * items.length - 600}px`;

    // Перепозиционируем текущий активный элемент
    list.style.transform = `translateY(${-itemHeight * currentIndex}px)`;
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

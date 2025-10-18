document.addEventListener('DOMContentLoaded', () => {
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animation]');
    if (!animatedElements.length) {
      console.log('No animated elements found');
      return null;
    }

    // Функция проверки позиции элемента
    const checkElementPosition = (el) => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const aboveViewport = rect.bottom < -100;
      const belowViewport = rect.top > viewportHeight + 100;

      return {
        aboveViewport,
        belowViewport,
        shouldBeVisible: !aboveViewport && !belowViewport,
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const animationType = el.dataset.animation;
          const delay = el.dataset.delay || '0s';
          const duration = el.dataset.duration || '0.6s';

          requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              el.style.transitionDelay = delay;
              el.style.transitionDuration = duration;
              el.classList.add(animationType, 'visible');
            } else {
              const { aboveViewport, belowViewport } = checkElementPosition(el);

              if (aboveViewport || belowViewport) {
                el.classList.remove('visible');
                el.style.transitionDelay = '0s';
                el.style.transitionDuration = '0.6s';
              }
            }
          });
        });
      },
      {
        threshold: 0.3,
        // Увеличиваем rootMargin чтобы отслеживать элементы дальше от viewport
        rootMargin: '100px 0px 100px 0px',
      }
    );

    // Добавляем обработчик скролла для дополнительной проверки
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        animatedElements.forEach((el) => {
          const { aboveViewport, belowViewport } = checkElementPosition(el);

          if (
            (aboveViewport || belowViewport) &&
            el.classList.contains('visible')
          ) {
            el.classList.remove('visible');
            el.style.transitionDelay = '0s';
            el.style.transitionDuration = '0.6s';
          }
        });
      }, 50); // Debounce для производительности
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    requestAnimationFrame(() => {
      animatedElements.forEach((el) => {
        if (!el.dataset.animation) {
          console.warn(
            'Element has data-animation but no animation type specified:',
            el
          );
          return;
        }
        observer.observe(el);
      });
    });

    return { observer, handleScroll };
  };

  const animationObserver = initScrollAnimations();
  window._animationObserver = animationObserver;

  window.disconnectScrollAnimations = () => {
    if (animationObserver) {
      animationObserver.observer.disconnect();
      window.removeEventListener('scroll', animationObserver.handleScroll);
      console.log('Scroll animations disconnected');
    }
  };
});

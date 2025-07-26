document.addEventListener('DOMContentLoaded', () => {
  const forms = [
    document.getElementById('form'),
    // document.getElementById('modal-form-proposal'),
    // document.getElementById('modal-form-coll'),
  ];

  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  // ======= Телефон: фильтрация только цифр =======
  phoneInputs.forEach((input) => {
    input.setAttribute('maxlength', '12');

    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 12); // максимум 13 цифр
    });

    input.addEventListener('keydown', (e) => {
      const allowedKeys = [
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        'Tab',
      ];

      if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });
  });

  // ======= Валидация всех форм =======
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      let isValid = true;

      form.querySelectorAll('.contact-form__label').forEach((label) => {
        label.classList.remove('error');
      });

      const nameInput = form.querySelector('input[name="name"]');
      if (!nameInput || !nameInput.value.trim()) {
        markInvalid(nameInput);
        isValid = false;
      }

      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.offsetParent !== null) {
        const digits = phoneInput.value.replace(/\D/g, '');
        if (!digits || digits.length < 9) {
          markInvalid(phoneInput);
          isValid = false;
        }
      }

      const emailInput = form.querySelector(
        'input[type="email"], input[name="email"]'
      );
      if (emailInput && emailInput.offsetParent !== null) {
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
          markInvalid(emailInput);
          isValid = false;
        }
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  function markInvalid(input) {
    const label = input.closest('.contact-form__label');
    if (label) {
      label.classList.add('error');
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = document.documentElement.lang || 'en';

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzjVxk-zgO_OrTySvtjs534qlwphL5_vfWGN4MJB_eEu_8VfE5EZ3E7K-qyVkpHDGcqHg/exec';

  const style = document.createElement('style');
  style.textContent = `
    .consultation-form__input.error {
      border-color: red !important;
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.consultation-form').forEach((form) => {
    const langInput = document.createElement('input');
    langInput.type = 'hidden';
    langInput.name = 'page_language';
    langInput.value = currentLang;
    form.appendChild(langInput);

    const selectContainers = form.querySelectorAll(
      '.consultation-form__select'
    );
    selectContainers.forEach((container) => {
      const trigger = container.querySelector('.consultation-form__select-btn');
      const list = container.querySelector('.consultation-form__select-list');
      const options = container.querySelectorAll(
        '.consultation-form__select-option'
      );
      const hiddenInput = form.querySelector(
        `input[name="${trigger.getAttribute('name')}"]`
      );

      const toggleSelect = (open = false) => {
        selectContainers.forEach((otherContainer) => {
          if (otherContainer !== container) {
            const otherList = otherContainer.querySelector(
              '.consultation-form__select-list'
            );
            const otherTrigger = otherContainer.querySelector(
              '.consultation-form__select-btn'
            );
            otherList.classList.remove(
              'consultation-form__select-list--active'
            );
            otherTrigger.classList.remove(
              'consultation-form__select-btn--active'
            );
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
        list.classList.toggle('consultation-form__select-list--active', open);
        trigger.classList.toggle('consultation-form__select-btn--active', open);
        trigger.setAttribute('aria-expanded', open);
      };

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        trigger.classList.remove('error');
        toggleSelect(
          !list.classList.contains('consultation-form__select-list--active')
        );
      });

      options.forEach((option) => {
        option.addEventListener('click', () => {
          const selectedValue = option.getAttribute('data-value');
          trigger.textContent = option.textContent.trim();
          if (hiddenInput) {
            hiddenInput.value = selectedValue;
          }
          toggleSelect(false);
        });
      });
    });

    // Close select lists when clicking outside the form
    document.addEventListener('click', (e) => {
      if (!form.contains(e.target)) {
        form
          .querySelectorAll('.consultation-form__select-list--active')
          .forEach((list) =>
            list.classList.remove('consultation-form__select-list--active')
          );
        form
          .querySelectorAll('.consultation-form__select-btn--active')
          .forEach((trigger) => {
            trigger.classList.remove('consultation-form__select-btn--active');
            trigger.setAttribute('aria-expanded', 'false');
          });
      }
    });

    // Form submission handler
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const isValid = validateForm(this);
      if (!isValid) return;

      const datetimeInput = this.querySelector('.js-form-datatime');
      if (datetimeInput) {
        datetimeInput.value = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      }

      // Prepare data for Google Sheets
      const formData = {
        name: this.querySelector('input[name="name"]').value,
        phone: this.querySelector('input[name="phone"]').value,
        language: this.querySelector('input[name="language"]').value,
        contact: this.querySelector('input[name="contact"]').value,
        time: datetimeInput ? datetimeInput.value : '',
        utm_source: this.querySelector('input[name="utm_source"]')?.value || '',
        utm_medium: this.querySelector('input[name="utm_medium"]')?.value || '',
        utm_campaign: this.querySelector('input[name="utm_campaign"]')?.value || '',
        utm_content: this.querySelector('input[name="utm_content"]')?.value || '',
        utm_term: this.querySelector('input[name="utm_term"]')?.value || ''
      };

      try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        // Handle redirect
        let thanksPath = '/thanks.html';
        const inputLang = document.querySelector('input[name="language"]');
        if (inputLang && inputLang.value === 'english') {
          thanksPath = '/eng/thanks.html';
        }
        const baseUrl = 'https://dent-alb.it';
        window.location.href = baseUrl + thanksPath;

        this.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
      }

      // const formData = new FormData(this);

      // fetch('form.php', {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then((response) => {
      //     // Handle response and redirect
      //     let thanksPath = '/thanks.html';
      //     const inputLang = document.querySelector('input[name="language"]');
      //     if (inputLang && inputLang.value === 'english') {
      //       thanksPath = '/eng/thanks.html';
      //     }
      //     const baseUrl = 'https://dent-alb.it';
      //     window.location.href = baseUrl + thanksPath;
      //
      //     this.reset();
      //   })
      //   .catch((error) => console.error('Error!', error.message));
    });
  });

  // Validation function
  function validateForm(form) {
    let isValid = true;

    // Check required fields
    const requiredInputs = form.querySelectorAll(
      'input[type="text"], input[type="tel"]'
    );
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    });

    // Validate language field
    const languageInput = form.querySelector('input[name="language"]');
    const languageSelectBtn = form.querySelector(
      '.consultation-form__select-btn[name="language"]'
    );
    if (languageInput && !languageInput.value.trim()) {
      languageSelectBtn?.classList.add('error');
      isValid = false;
    } else {
      languageSelectBtn?.classList.remove('error');
    }

    // Validate contact field
    const contactInput = form.querySelector('input[name="contact"]');
    const contactSelectBtn = form.querySelector(
      '.consultation-form__select-btn[name="contact"]'
    );
    if (contactInput && !contactInput.value.trim()) {
      contactSelectBtn?.classList.add('error');
      isValid = false;
    } else {
      contactSelectBtn?.classList.remove('error');
    }

    return isValid;
  }

  // Remove error on input
  document
    .querySelectorAll('input[type="text"], input[type="tel"]')
    .forEach((input) => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('error');
        }
      });
    });
});

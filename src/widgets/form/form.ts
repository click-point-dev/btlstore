import Inputmask from 'inputmask';
import JustValidate, { Rules } from 'just-validate';
import { addClass, removeClass } from '../../shared';
import gsap from 'gsap';

export function form(): void {
   const forms = Array.from(document.forms);

   if (!forms.length) return;

   forms.forEach(form => {
      // console.log(form);
      //+ обработка input name=fn
      const fn = form.querySelector('input[required]');
      if (fn) {
         setTimeout(function () {
            if (fn.hasAttribute('required')) fn.removeAttribute('required');
         }, 1500);
      }

      // phone mask
      const telInput = form.querySelector('input[type="tel"]') as HTMLElement;
      const inputMask = new Inputmask('+7 (999)-999-99-99');
      if (telInput) {
         inputMask.mask(telInput);
      }

      // validate and submit
      const validate = new JustValidate(form, {
         validateBeforeSubmitting: true,
         // testingMode: true,
      });
      validateForm(form, validate, telInput);

      validate.onSuccess(event => {
         const form = event.target as HTMLFormElement;
         submitForm(form);
      });
   });

   function validateForm(
      form: HTMLFormElement,
      validate: JustValidate,
      telInput: HTMLElement,
   ) {
      if (form.name) {
         validate.addField(form.name, [
            {
               rule: Rules.CustomRegexp,
               value: /^[-А-Яа-яЁё A-Za-z]*$/,
               errorMessage: 'Только буквы, тире, пробел',
            },
            {
               rule: Rules.MinLength,
               value: 3,
               errorMessage: 'Минимум 3 символа',
            },
            {
               rule: Rules.MaxLength,
               value: 30,
               errorMessage: 'Не более 30 символов',
            },
         ]);
      }

      if (form.phone) {
         validate.addField(form.phone, [
            {
               rule: Rules.Required,
               errorMessage: 'Телефон обязателен',
            },
            {
               validator: function () {
                  let phone;
                  if (telInput.inputmask) {
                     phone = telInput.inputmask.unmaskedvalue();
                     // return phone.length === 10;
                  }
                  return Number(phone) && phone.length === 10 ? true : false;
               },
               errorMessage: 'Введите 10 цифр',
            },
         ]);
      }

      // if (form['file[]']) {
      //    validate.addField('#filesInput', [
      //       {
      //          rule: 'files',
      //          errorMessage: 'Файлы не более 15 Мб',
      //          value: {
      //             files: {
      //                maxSize: 15000000,
      //             },
      //          },
      //       },
      //       {
      //          rule: 'maxFilesCount',
      //          value: 3,
      //          errorMessage: 'Не более 3 файлов',
      //       },
      //    ]);
      // }
   }

   // get vacancy name
   // function getVacancyName(form: HTMLFormElement) {
   //    const parentBlock = form.closest('.full-width-form');
   //    const vacancy =
   //       parentBlock &&
   //       parentBlock.querySelector('.full-width-form__vacancy-title')
   //          .textContent;

   //    if (vacancy) return vacancy;
   // }

   async function submitForm(form: HTMLFormElement) {
      // const vacancy = getVacancyName(form);
      const formData = new FormData(form);
      const method = form.getAttribute('method');
      const loader = form.querySelector('.form__loader') as HTMLElement;

      // if (vacancy) formData.set('Title', `Отклик на вакансию: ${vacancy}`);

      // for (const item of formData.entries()) {
      //    console.log(item);
      // }

      addClass(loader, 'visible');

      try {
         const res = await fetch('/request.php', {
            method: method,
            body: formData,
         });

         // console.log(res);

         if (res.status !== 200) {
            throw new Error(`❌ Что-то не так. Код ответа ${res.status}`);
         }

         console.log('Успех');
         // flsModules.popup.open('#popup-accept');
      } catch (error) {
         console.error(error);
         // flsModules.popup.open('#popup-reject');
      } finally {
         removeClass(loader, 'visible');
         form.reset();
      }
   }
}

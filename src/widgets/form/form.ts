import Inputmask from 'inputmask';
import JustValidate, { Rules } from 'just-validate';
import {
   addClass,
   changeElements,
   getVacancyName,
   removeClass,
} from '../../shared';
import gsap from 'gsap';

export function form(): void {
   const forms = Array.from(document.forms);

   if (!forms.length) return;

   forms.forEach(form => {
      // console.log(form);
      //+ обработка input name=fn
      const fn = form.querySelector('#fn');
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
               rule: Rules.Required,
               errorMessage: 'Введите имя',
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
      if (form.agreement) {
         validate.addField(form.agreement, [
            {
               rule: Rules.Required,
               errorMessage: 'Согласие обязательно',
            },
         ]);
      }
   }

   async function submitForm(form: HTMLFormElement) {
      const formData = new FormData(form);
      const method = form.getAttribute('method');
      const loader = form.querySelector('.form__loader') as HTMLElement;
      const { isVacancy, vacancyTitle } = getVacancyName(form);

      formData.set(
         'title',
         `${isVacancy ? `Отклик на вакансию: ${vacancyTitle}` : `Заявка с сайта ${window.location.hostname}`}`,
      );
      if (isVacancy) formData.set('type', 'vacancy');

      // console.log(
      //    isVacancy,
      //    vacancyTitle,
      //    formData.get('title'),
      //    formData.get('type'),
      // );

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
            throw new Error(`❌ Что-то пошло не так. Код ответа ${res.status}`);
         }
         const success = document.querySelector('.success') as HTMLElement;
         changeElements(form, success, 2000);
      } catch (error) {
         console.error(error);
         const errorBlock = document.createElement('div');
         errorBlock.className = 'text text-white';
         errorBlock.style.paddingBlock = '50px';
         errorBlock.style.textAlign = 'center';
         errorBlock.textContent = error;
         form.insertAdjacentElement('afterbegin', errorBlock);
      } finally {
         removeClass(loader, 'visible');
         form.reset();
      }
   }
}

import Inputmask from 'inputmask';
import JustValidate, { Rules } from 'just-validate';
import {
   addClass,
   changeElements,
   getVacancyName,
   inputFile,
   inputRadio,
   multicheckbox,
   RadioGruoupData,
   removeClass,
   showOverlay,
} from '../../shared';

export function form(): void {
   const forms = Array.from(document.forms);

   // let fileList = [];

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
      const inputMask = new Inputmask('+7 (999)-999-99-99', {
         showMaskOnHover: false,
      });
      if (telInput) {
         inputMask.mask(telInput);
      }

      // validate and submit
      //todo tooltip, addRequiredGroup for multicheckbox
      const validate = new JustValidate(form, {
         validateBeforeSubmitting: true,
         // testingMode: true,
      });

      //radio inputs (with others groups)
      inputRadio(form, validate);

      //file input
      inputFile(form);

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
      if (form.brand) {
         validate.addField(form.brand, [
            {
               rule: Rules.CustomRegexp,
               value: /^[-А-Яа-яЁё A-Za-z]*$/,
               errorMessage: 'Только буквы, тире, пробел',
            },
            {
               rule: Rules.Required,
               errorMessage: 'Укажите компанию',
            },
         ]);
      }
      if (form.comment) {
         validate.addField(form.comment, [
            {
               rule: Rules.CustomRegexp,
               value: /^[-А-Яа-яЁё A-Za-z0-9]*$/,
               errorMessage: 'Только буквы, цифры, тире, пробел',
            },
            {
               rule: Rules.MaxLength,
               value: 500,
               errorMessage: 'Не более 115 символов',
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
      if (form.surname) {
         validate.addField(form.surname, [
            {
               rule: Rules.CustomRegexp,
               value: /^[-А-Яа-яЁё A-Za-z]*$/,
               errorMessage: 'Только буквы, тире, пробел',
            },
            {
               rule: Rules.Required,
               errorMessage: 'Введите фамилию',
            },
            {
               rule: Rules.MinLength,
               value: 2,
               errorMessage: 'Минимум 2 символа',
            },
            {
               rule: Rules.MaxLength,
               value: 50,
               errorMessage: 'Не более 50 символов',
            },
         ]);
      }
      if (form.bdate) {
         validate.addField(form.bdate, [
            {
               rule: Rules.Required,
               errorMessage: 'Укажите дату рождения',
            },
         ]);
      }
      if (form.sex) {
         validate.addField(form.sex, [
            {
               rule: Rules.Required,
               errorMessage: 'Укажите ваш пол',
            },
         ]);
      }
      if (form.city) {
         validate.addField(form.city, [
            {
               rule: Rules.Required,
               errorMessage: 'Укажите город',
            },
            {
               rule: Rules.MinLength,
               value: 2,
               errorMessage: 'Минимум 2 символа',
            },
            {
               rule: Rules.MaxLength,
               value: 50,
               errorMessage: 'Не более 50 символов',
            },
         ]);
      }
      if (form.height) {
         validate.addField(form.height, [
            {
               rule: Rules.Required,
               errorMessage: 'Укажите свой рост в см',
            },
         ]);
      }
      if (form.job) {
         const jobBlock = form
            .querySelector('input[name="job"]')
            .closest('.multicheckbox') as HTMLElement;
         validate.addRequiredGroup(jobBlock, 'Укажите хотя бы один вариант');
      }
      if (form['file[]']) {
         validate.addField(form['file[]'], [
            {
               rule: Rules.MinFilesCount,
               value: 1,
               errorMessage: 'Фото обязательно',
            },
            {
               rule: Rules.Files,
               errorMessage: 'Файл не более 15 Мб',
               value: {
                  files: {
                     maxSize: 15000000,
                  },
               },
            },
            {
               rule: Rules.Files,
               errorMessage: 'Только изображения png, jpg, jpeg',
               value: {
                  files: {
                     extensions: ['png', 'jpg', 'jpeg'],
                  },
               },
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
      let message: string;
      const formData = new FormData(form);
      const method = form.getAttribute('method');
      const loader = form.querySelector('.form__loader') as HTMLElement;
      const { isVacancy, vacancyTitle } = getVacancyName(form);
      const isGoogleSheets = form.hasAttribute('data-toGoogleSheets');

      const multicheckboxesData = multicheckbox(form);
      const radioGroupsData = JSON.parse(
         sessionStorage.getItem('radioGroupsData'),
      ) as Array<RadioGruoupData>;
      let commentString = formData.get('comment') || '';
      const height = formData.get('height') || '';
      const citizenship =
         radioGroupsData.filter(item => item._nameAttr === 'citizenship')[0]
            ._value || formData.get('citizenship');
      const medical_book = formData.get('medical_book') || '';
      const clothes_size = formData.get('clothes_size') || '';
      const phone = formData.get('phone') || '';

      formData.set(
         'title',
         `${isVacancy ? `Отклик на вакансию: ${vacancyTitle}` : `Заявка с сайта ${window.location.hostname}`}`,
      );
      if (isVacancy) formData.set('type', 'vacancy');

      if (Boolean(height))
         commentString += `Рост: ${height.toString().trim()} см;\r\n`;
      if (Boolean(citizenship))
         commentString += `Гражданство: ${citizenship.toString().trim()};\r\n`;
      if (Boolean(clothes_size))
         commentString += `Размер одежды: ${clothes_size.toString().trim()};\r\n`;
      if (Boolean(medical_book))
         commentString += `Медицинская книжка: ${medical_book.toString().trim()};\r\n`;
      multicheckboxesData.forEach(data => {
         if (data.value.length) {
            commentString += `${data.title}: ${data.value.join(', ')}`;
         }
         if (data.value.length && isGoogleSheets) {
            formData.set('job', data.value.join(', '));
         }
      });

      phone &&
         formData.set('phone', phone.toString().trim().replace(/[\D]+/g, ''));
      commentString && formData.set('comment', commentString);
      citizenship && formData.set('citizenship', citizenship);

      addClass(loader, 'visible');

      // for (let [key, value] of formData.entries()) {
      //    console.log(key, value);
      // }

      if (isGoogleSheets) {
         const URL_APP =
            'https://script.google.com/macros/s/AKfycbyZvp1_-hO_051X3S8A_CZG64ob46lwTV6xzDX2ZkJZBxc4aPlFXb1RqsG1Cr5bpjjs/exec';

         const phone = formData.get('phone').slice(1);
         formData.set('phone', phone);

         try {
            const res = await fetch(URL_APP, {
               method: method,
               mode: 'no-cors',
               body: formData,
            });
            console.log(res);
         } catch (error) {
            console.error('Ошибка при отправке данных в google sheet:', error);
         }
      }

      try {
         const res = await fetch('/api/request.php', {
            method: method,
            body: formData,
         });
         // console.log(res);
         if (res.status !== 200) {
            throw new Error(
               `❌\n Что-то пошло не так. Код ответа ${res.status}`,
            );
         }

         message = '✅ Заявка отправлена!';
         form.reset();
      } catch (error) {
         console.error(error);
         message = error;
      } finally {
         removeClass(loader, 'visible');
         showOverlay(form, message, null, 3000);
      }
   }
}

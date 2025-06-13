import Inputmask from 'inputmask';
import JustValidate, { Rules } from 'just-validate';
import {
   addClass,
   changeElements,
   documentLock,
   documentUnlock,
   getVacancyName,
   inputFile,
   inputRadio,
   multicheckbox,
   RadioGruoupData,
   removeClass,
   showOverlay,
} from '../../shared';

export function form() {
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
      const inputMask = new Inputmask('+7 (999)-999-99-99', {
         showMaskOnHover: false,
      });
      if (telInput) {
         inputMask.mask(telInput);
      }

      // validate and submit
      const validate = new JustValidate(form, {
         validateBeforeSubmitting: true,
         // testingMode: true,
      });

      //radio inputs (with others inputs)
      inputRadio(form, validate);

      //file input
      const filesList = inputFile(form, validate);
      // for (let [key, value] of new FormData(form).entries()) {
      //    console.log(key, value);
      // }

      validateForm(form, validate, telInput);

      validate.onSuccess(event => {
         const form = event.target as HTMLFormElement;
         submitForm(form, filesList);
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
      if (form.agreement) {
         validate.addField(form.agreement, [
            {
               rule: Rules.Required,
               errorMessage: 'Согласие обязательно',
            },
         ]);
      }
   }

   async function sendPostRequestToGoogleSheets(
      url: string,
      body: FormData,
      message: string,
   ) {
      try {
         const res = await fetch(url, {
            method: 'POST',
            // mode: 'no-cors',
            body: body,
         });
         if (res.ok) {
            // const data = await res.json();
            // console.log(data);
            message += `<p>✅ Данные записаны в таблицу</p>`;
         }
      } catch (error) {
         message += `<p>Ошибка при отправке данных в google sheet: ${error}</p>`;
         console.error(error);
      }
   }

   async function submitForm(form: HTMLFormElement, filesList: File[] = []) {
      const promoterSheetUrl =
         'https://script.google.com/macros/s/AKfycbw_JvVw_cHcyE1xcbg8aPmD12B3tNTXp6YlBxn4miOZA2QK1df-AONrbKrIFjGUR_AY/exec';
      let message: string = '';

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
         radioGroupsData?.filter(item => item._nameAttr === 'citizenship')[0]
            ._value || formData.get('citizenship');
      const medical_book = formData.get('medical_book') || '';
      const clothes_size = formData.get('clothes_size') || '';
      const phone = formData.get('phone') || '';

      //+ title
      formData.set(
         'title',
         `${isVacancy ? `Отклик на вакансию: ${vacancyTitle}` : `Заявка с сайта ${window.location.hostname}`}`,
      );

      //+ type
      if (isVacancy) formData.set('type', 'vacancy');

      //+ comment
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
         //+ job
         if (data.value.length && isGoogleSheets) {
            formData.set('job', data.value.join(', '));
         }
      });
      commentString && formData.set('comment', commentString);

      //+ phone
      phone &&
         formData.set('phone', phone.toString().trim().replace(/[\D]+/g, ''));

      //+ citizenship
      citizenship && formData.set('citizenship', citizenship);

      //+ file[]
      formData.delete('file[]');
      // console.log(filesList);
      if (filesList.length) {
         filesList.forEach(file => {
            formData.append('file[]', file);
         });
      }

      //+ логи formData
      // for (let [key, value] of formData.entries()) {
      //    console.log(key, value);
      // }

      try {
         addClass(loader, 'visible');
         const res = await fetch('/api/request.php', {
            method: method,
            body: formData,
         });

         if (res.status !== 200) {
            throw new Error(
               `<p>❌ Что-то пошло не так. Код ответа ${res.status}</p>`,
            );
         }

         isGoogleSheets &&
            (await sendPostRequestToGoogleSheets(
               promoterSheetUrl,
               formData,
               message,
            ));

         message += '<p>✅ Заявка отправлена.</p>';
         form.reset();
      } catch (error) {
         console.error(error);
         message += error;
      } finally {
         removeClass(loader, 'visible');
         message += `</br><p>сейчас вернем вас обратно!</p><p class="h3">🤗</p>`;
         await showOverlay(
            document.body,
            message,
            'text-xs align-center',
            3000,
         );
      }
   }
}

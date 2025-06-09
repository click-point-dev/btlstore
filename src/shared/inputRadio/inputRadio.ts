import JustValidate, { Rules } from 'just-validate';
import { inputRadioTypes } from './inputRadioTypes';

const radioGroupsData: RadioGruoupData[] = [];

export class RadioGruoupData {
   constructor(groupTitle = '', value = '', nameAttr = '') {
      this._groupTitle = groupTitle;
      this._value = value;
      this._nameAttr = nameAttr;
   }

   _groupTitle: string;
   _value: string;
   _nameAttr: string;

   #setDataInStorage() {
      sessionStorage.setItem(
         'radioGroupsData',
         JSON.stringify(radioGroupsData),
      );
   }

   get groupTitle(): string {
      return this._groupTitle;
   }

   set groupTitle(value: string) {
      this._groupTitle = value;
      this.#setDataInStorage();
   }

   get nameAttr(): string {
      return this._nameAttr;
   }

   set nameAttr(value: string) {
      this._nameAttr = value;
      this.#setDataInStorage();
   }

   get value() {
      return this._value;
   }

   set value(val: string) {
      this._value = val;
      this.#setDataInStorage();
   }
}

export function inputRadio(form: HTMLFormElement, validator: JustValidate) {
   const radioGroupNames = [
      ...new Set(
         [...form.querySelectorAll('input[type="radio"]')].map(
            (radio: HTMLInputElement) => radio.name,
         ),
      ),
   ];

   radioGroupNames.length &&
      radioGroupNames.forEach(groupName => {
         const data = new RadioGruoupData('', '', groupName);
         radioGroupsData.push(data);

         const textInput = form.querySelector(
            `input[type='text'][name=${groupName}]`,
         ) as HTMLInputElement;

         const validate = validator;

         function setInputValidation(input: HTMLInputElement, message: string) {
            input &&
               validate.addField(input, [
                  {
                     rule: Rules.Required,
                     errorMessage: `${message}`,
                  },
               ]);
         }

         function removeInputValidation(input: HTMLInputElement) {
            input && validate.removeField(input);
         }

         const radioButtons = form.querySelectorAll(
            `input[type='radio'][name=${groupName}]`,
         ) as NodeListOf<HTMLInputElement>;

         radioButtons.forEach(radioButton => {
            if (radioButton.checked) data.value = radioButton.value;

            radioButton.addEventListener('change', e => {
               const targetButton = e.target as HTMLInputElement;
               const isOther = targetButton.value === 'other';

               if (isOther) {
                  textInput.disabled = false;
                  textInput.focus();
                  //todo при нескольких others добавить enum для сообщения валидации
                  setInputValidation(textInput, 'Укажите национальность');
               }

               if (!isOther) {
                  data.value = targetButton.value;
                  // console.log(radioGroupsData);
               }

               if (
                  !isOther &&
                  textInput &&
                  targetButton.name === textInput.name
               ) {
                  data.value = targetButton.value;
                  // console.log(radioGroupsData);
                  removeInputValidation(textInput);
                  textInput.disabled = true;
                  textInput.value = '';
               }
            });
         });

         textInput &&
            textInput.addEventListener('input', e => {
               data.value = textInput.value;
               // console.log(data);
            });
      });

   sessionStorage.setItem('radioGroupsData', JSON.stringify(radioGroupsData));

   return radioGroupsData;
}

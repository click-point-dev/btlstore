import JustValidate from 'just-validate';
import { multicheckboxTypes } from './multicheckbox.d';

export function multicheckbox(form: HTMLFormElement) {
   const multicheckboxesArray = Array.from(
      form.querySelectorAll('[data-multicheckbox]'),
   );

   let multicheckboxesData: multicheckboxTypes[] = [];

   if (multicheckboxesArray.length) {
      multicheckboxesArray.forEach(checkboxesBlock => {
         const title =
            checkboxesBlock.querySelector('[data-multicheckbox-title]')
               ?.textContent || '';
         const nameAttr = checkboxesBlock
            .querySelector('input[type="checkbox"]')
            .getAttribute('name');
         const checkedValuesArray = Array.from(
            checkboxesBlock.querySelectorAll('input[type="checkbox"]:checked'),
         ).map((item: HTMLInputElement) => item.value);

         multicheckboxesData.push({
            nameAttr,
            title,
            value: checkedValuesArray,
         });

         // consolidatedValueWithTitle.push(
         //    `${title}: ${checkedValuesArray.join(', ')}`,
         // );
      });
   }
   return multicheckboxesData;
}

import { insertContent } from '../../shared';

//data-popup-type="popup-vacancy"

export function vacanciesPage(): void {
   const ctaButtons: HTMLElement[] = Array.from(
      document.querySelectorAll(
         '.vacancy__cta [data-popup-type="popup-vacancy"]',
      ),
   );
   const vacanciesCountPlaceholder = Array.from(
      document.querySelectorAll('[data-vacancy-count-placeholder]'),
   );

   function paintVacancyTitle(triggers: HTMLElement[]) {
      triggers.forEach(button => {
         const vacancyElement: HTMLElement = button.closest(
            '[data-vacancy-title]',
         );
         const vacancyTitle = vacancyElement.dataset.vacancyTitle.trim();

         const vacancyForm: HTMLFormElement =
            document.querySelector('[data-vacancy]');

         const placeholder: HTMLElement = document.querySelector(
            '[data-vacancy-title-placeholder]',
         );

         button.onclick = () => {
            insertContent(vacancyTitle, placeholder);
            vacancyForm.dataset.vacancy = vacancyTitle;
         };
      });
   }

   function paintVacanciesCount(placeholder: Element[]) {
      placeholder.forEach(element => {
         const count = element
            .closest('.vacancies__container')
            .querySelectorAll('[data-vacancy-title]').length;

         element.textContent = `${count}`;
      });
   }

   //пэинт заголовка вакансии в форме
   ctaButtons.length && paintVacancyTitle(ctaButtons);

   // пэинт количества открытых вакансий
   vacanciesCountPlaceholder && paintVacanciesCount(vacanciesCountPlaceholder);
}

import { insertContent } from '../../shared';

//data-popup-type="popup-vacancy"

export function vacanciesPage(): void {
   const ctaButtons: HTMLElement[] = Array.from(
      document.querySelectorAll(
         '.vacancy__cta [data-popup-type="popup-vacancy"]',
      ),
   );

   if (!ctaButtons.length) return;

   ctaButtons.forEach(button => {
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
